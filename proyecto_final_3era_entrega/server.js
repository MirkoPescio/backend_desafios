require("dotenv").config();
const express = require("express");
const os = require("os");
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
const compression = require("compression");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
const logger = require("./middlewares/logger.js");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const { getNormalized } = require("./utils/normalizer.js");
const getSystemInformation = require("./middlewares/info.js");

const fakerData = randomData();
const infoSystem = getSystemInformation();

const products = new Container(optionsSQLite3, "products");
const messages = new Container(optionsMariaDB, "messages");

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
        ttl: 100,
      }),
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use(router);
  app.use(express.static("views"));
  app.engine("handlebars", engine());
  app.set("views", "./views");
  app.set("view engine", "handlebars");

  // Para conexión local a MongoDB
  // const mongo_uri = process.env.MONGOURI;

  mongoose.connect(mongoDBServer, function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Conexión exitosa a ${mongoDBServer}`);
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
    socket.on("processProducts", async () => {
      console.log("Productos procesados en el backend", dbProducts);
      function createSendMail(mailConfig) {
        const transporter = nodemailer.createTransport(mailConfig);

        return function sendMail({ to, subject, text, html }) {
          const mailOptions = {
            from: mailConfig.auth.user,
            to,
            subject,
            text,
            html,
          };

          return transporter.sendMail(mailOptions);
        };
      }

      const MY_GMAIL = "mirkopes.4050@gmail.com";

      function createSendMailGmail() {
        return createSendMail({
          service: "gmail",
          port: 587,
          auth: {
            user: MY_GMAIL,
            pass: "vrhrsznbdrwbmroa",
          },
        });
      }

      const sendMail = createSendMailGmail();

      const cuenta = MY_GMAIL;
      const asunto = "Productos Enviados";
      const mensajeHtml = `Productos Enviados: ${JSON.stringify(dbProducts)}`;

      const info = await sendMail({
        to: cuenta,
        subject: asunto,
        html: mensajeHtml,
      });

      const account_sid = "AC1adf252f4dbc79c51ae913c207f5ff41";
      const authToken = "ad57ed447cee5bbb585e286bd72d5874";

      const client = twilio(account_sid, authToken);

      const options = {
        body: `Productos Enviados: ${JSON.stringify(dbProducts)}`,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5491158069635",
      };

      const message = await client.messages.create(options);

      console.log(message);
      console.log(info);
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

  httpserver.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
