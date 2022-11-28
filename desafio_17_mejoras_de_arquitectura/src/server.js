require("dotenv").config();
require('./persistence/store/firebase/connection')
const express = require("express");
const os = require("os");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const router = require("./routes/router.js");
const productsDB = require('./persistence/productPersistence')
const chatDB = require('./persistence/chatPersistence')
const cookieParser = require("cookie-parser");
const randomData = require("./options/faker.js");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const parseArgs = require("minimist");
const cluster = require("cluster");
const compression = require("compression");
const logger = require("./middlewares/logger.js");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const getSystemInformation = require("./middlewares/info.js");
const path = require("path");

const fakerData = randomData();
const infoSystem = getSystemInformation();

const mongoDBServer =
  "mongodb+srv://MirkoIP99:KZJDE5HVpYCKhngi@cluster0.ve17wc6.mongodb.net/sesiones?retryWrites=true&w=majority";

const { PORT, MODE } = parseArgs(process.argv.slice(2), {
  alias: {
    p: "PORT",
    m: "MODE",
  },
  default: {
    PORT: 8080,
    MODE: "FORK",
  },
});

if (MODE === "CLUSTER" && cluster.isPrimary) {
  const numCpus = os.cpus().length;

  console.log("SERVIDOR MAESTRO DEL CLUSTER: ");
  console.log("Número de procesadores: " + numCpus);
  console.log("PID:" + process.pid);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    console.log("Worker " + process.pid + " exit");
    cluster.fork();
  });
} else {
  const app = express();
  const httpServer = new HttpServer(app);
  const io = new IOServer(httpServer);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: mongoDBServer,
        mongoOptions: advancedOptions,
        ttl: 100,
      }),
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(router);
  app.use(express.static(path.join(__dirname, "../public")));
  app.engine("handlebars", engine());
  app.set("views", path.join(__dirname, "../public/views"));
  app.set("view engine", "handlebars");

  mongoose.connect(mongoDBServer, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Conexión exitosa a ${mongoDBServer}`);
    }
  });

  async function main(socket) {
    console.log("Conexión establecida con sockets");

    const dbProducts = await productsDB.getAllProducts();
    io.sockets.emit("products", dbProducts);
    const dbMessages = await chatDB.getAllMessages();
    io.sockets.emit("messages", dbMessages);

    socket.on("product", async (product) => {
      productsDB.addProduct(product);
      const dbProducts = await productsDB.getAllProducts();
      io.sockets.emit("products", dbProducts);
    });
    socket.on("message", async (message) => {
      chatDB.addMessage(message);
      const dbMessages = await chatDB.getAllMessages();
      io.sockets.emit("messages", dbMessages);
    });
  }

  app.get("/api/products-test", async (req, res) => {
    logger.info("Ruta accedida");
    console.log("Conexión establecida a faker");
    res.send(fakerData);
  });

  app.get("/info", (req, res) => {
    logger.info("Ruta accedida");
    res.json(infoSystem);
  });

  app.get("/info/gzip", compression(), (req, res) => {
    logger.info("Ruta accedida");
    res.json(infoSystem);
  });

  app.get("*", (req, res) => {
    logger.warn("Ruta no implementada");
    res.send("Ruta no implementada");
  });

  io.on('connection', main)
  httpServer.listen(PORT, () => console.log(`Server corriendo en el puerto: ${PORT} - PID(${process.pid}) - (${new Date().toLocaleString()})`))
}