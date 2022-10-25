const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const Container = require("./containers/container.js");
const router = require("./routes/router.js");
const { optionsMariaDB, optionsSQLite3 } = require("./options/config.js");
const cookieParser = require("cookie-parser");
const randomData = require("./options/faker.js");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const parseArgs = require("minimist");
const cluster = require("cluster");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { getNormalized } = require("./utils/normalizer.js");
const info = require("./middlewares/info.js");

const fakerData = randomData();
require("dotenv").config();

const products = new Container(optionsSQLite3, "products");
const messages = new Container(optionsMariaDB, "messages");

const mongoDBServer = process.env.MONGODBSERVER;

const { PORT, MODE } = parseArgs(process.argv.slice(2), {
  alias: {
    p: "PORT",
    m: "MODE",
  },
  default: {
    PORT: process.argv[2] || 8080,
    MODE: "FORK",
  },
});

// Flag para port: --PORT 8081 por ejemplo
// ejemplo con forever: forever start server.js --PORT 8081

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
  const httpserver = new HttpServer(app);
  const io = new IOServer(httpserver);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: mongoDBServer,
        mongoOptions: advancedOptions,
        ttl: 60,
        collectionName: "sessions",
      }),
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
    })
  );

  app.use(router);
  app.use(express.static("views"));
  app.engine("handlebars", engine());
  app.set("views", "./views");
  app.set("view engine", "handlebars");

  const mongo_uri = process.env.MONGOURI;

  mongoose.connect(mongo_uri, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Conexión exitosa a ${mongo_uri}`);
    }
  });

  const processMsgData = (msgData) => {
    const plainMsgs = msgData.map((msg) => {
      return msg;
    });
    const originalData = { id: "messages", mensajes: plainMsgs };
    return getNormalized(originalData);
  };

  io.on("connection", async (socket) => {
    console.log("Conexión establecida");

    const dbProducts = await products.getAll();
    io.sockets.emit("products", dbProducts);
    const dbMessages = await messages.getAll();
    const mensajes = processMsgData(dbMessages);
    console.log(mensajes);
    io.sockets.emit("messages", dbMessages);

    socket.on("product", async (product) => {
      products.save(product);
      const dbProducts = await products.getAll();
      io.sockets.emit("products", dbProducts);
    });
    socket.on("message", async (message) => {
      messages.save(message);
      const dbMessages = await messages.getAll();
      const mensajes = processMsgData(dbMessages);
      console.log(mensajes);
      io.sockets.emit("messages", dbMessages);
    });
  });

  app.get("/api/products-test", async (req, res) => {
    console.log("Conexión establecida a faker");
    res.send(fakerData);
  });

  app.get("/info", async (req, res) => {
    res.send({
      Argumentos_de_entrada: info.ARGS,
      Nombre_de_la_plataforma: info.CURRENT_SYSTEM,
      Versión_de_nodejs: info.NODE_VERSION,
      Memoria_total_reservada: info.TOTAL_MEMORY,
      Path_de_ejecución: info.CURRENT_PATH,
      Proccess_id: info.PROCESS_ID,
      Carpeta_del_proyecto: info.FOLDER_PATH,
      Número_de_procesadores: info.N_PROCESSORS,
    });
  });

  const server = httpserver.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on("error", () => console.log(`Error: ${err}`));
}
