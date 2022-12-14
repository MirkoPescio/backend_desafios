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
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { getNormalized } = require("./utils/normalizer.js");
const info = require("./middlewares/info.js");

const app = express();
const fakerData = randomData();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);
require("dotenv").config();
const { fork } = require("child_process");


const products = new Container(optionsSQLite3, "products");
const messages = new Container(optionsMariaDB, "messages");

const port = process.env.PORT;
const mongoDBServer = process.env.MONGODBSERVER;

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
    system: info.CURRENT_SYSTEM,
    node: info.NODE_VERSION,
    memory: info.TOTAL_MEMORY,
    path: info.CURRENT_PATH,
    id: info.PROCESS_ID,
    current_port: process.env.PORT,
  });
});

const server = httpserver.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on("error", () => console.log(`Error: ${err}`));
