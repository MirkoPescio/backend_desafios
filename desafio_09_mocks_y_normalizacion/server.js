const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const { engine } = require("express-handlebars");
const Container = require("./containers/container.js");
const MongoDbContainer = require("./containers/ContenedorMongoDB.js");
const { optionsSQLite3 } = require("./options/config.js");
const randomData = require('./options/faker.js');
const { msgsCollection, msgsSchema } = require("./options/msgs.js");
const getNormalized = require('./utils/normalizer.js');
const mongoose = require("mongoose");

const PORT = 8080;
const app = express();
const fakerData = randomData();
const httpserver = new HttpServer(app);
const io = new IOServer(httpserver);

const products = new Container(optionsSQLite3, "products");
const messages = new MongoDbContainer(msgsCollection, msgsSchema);


const processMsgData = (msgData) => {
  const plainMsgs = msgData.map((msg) => {
    const dateTime = new Date(parseInt(msg.id.substring(0, 8), 16) * 1000);
    delete msg.author["_id"];
    delete msg["__v"];
    msg = { ...msg, dateTime };
    return msg;
  });
  const originalData = { id: "messages", mensajes: plainMsgs };
  return getNormalized(originalData)
};


io.on("connection", async (socket) => {
  console.log("Conexión establecida a sql");
  const dbProducts = await products.getAll();
  io.sockets.emit("products", dbProducts);
  const dbMessages = await messages.getAll();
  const mensajes = processMsgData(dbMessages);
  io.sockets.emit("messages", mensajes);
  socket.on("product", async (product) => {
    products.save(product);
    const dbProducts = await products.getAll();
    io.sockets.emit("products", dbProducts);
  });
  socket.on("newMessage", async (message) => {
    await messages.createNew(message);
    const dbMessages = await messages.getAll();
    const mensajes = processMsgData(dbMessages);
    io.sockets.emit("messages", mensajes);
  });
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const server = httpserver.listen(PORT, async () => {
  await mongoose.connect("mongodb://localhost:27017/normalizerDB", options);

  console.log(`Servidor corriendo en el puerto: ${PORT}`)
});
server.on("error", () => console.log(`Error: ${err}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

app.get("/", async (req, res) => {
  res.render("form");
});

app.get('/api/products-test', async (req, res) => {
  console.log('Conexión establecida a faker');
  res.send(fakerData);
});


/*
PRODUCTOS PARA AGREGAR EN EL FRONT-END:

{ "nombre": "Uncharted 4", "descripcion": "Juego de aventura PS4", "imagen": "https://media.vandal.net/m/22805/uncharted-4-el-desenlace-del-ladron-201659184157_1.jpg", "precio": 1500, "stock": 14 },
{ "nombre": "The Last of Us", "descripcion": "Juego de aventura PS3", "imagen": "https://elbuengamer.com.co/821-thickbox_default/the-last-of-us-digital-ps3.jpg", "precio": 1200, "stock": 9 },
{ "nombre": "FIFA 22", "descripcion": "Juego de Football PS4/PS5", "imagen": "https://www.clarin.com/img/2021/07/09/la-tapa-del-videojuego-fifa___tjKkHVKPI_720x0__1.jpg", "precio": 4500, "stock": 12 }
*/
