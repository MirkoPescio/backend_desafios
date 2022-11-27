const nodemailer = require("nodemailer");
const User = require("../../public/js/user.js");

const MY_GMAIL = "mirkopes.4050@gmail.com";

const login = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) {
      res.status(500).send("Error al autenticar el usuario");
    } else if (!user) {
      alert("El usuario no existe");
      res.render("register.handlebars");
    } else {
      user.isCorrectPassword(password, (err, result) => {
        if (err) {
          res.status(500).send("Error al autenticar");
        } else if (result) {
          res.render("form.handlebars", {
            username: req.body.username,
          });
        } else {
          res.status(500).send("Usuario y/o contraseña incorrectos");
        }
      });
    }
  });
};

function createSendMail(mailConfig) {
  const transporter = nodemailer.createTransport(mailConfig);

  return function sendMail({ to, subject, text }) {
    const mailOptions = {
      from: mailConfig.auth.user,
      to,
      subject,
      text,
    };

    return transporter.sendMail(mailOptions);
  };
}

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

const register = (req, res) => {
  const { name, age, email, phoneNumber, username, password } = req.body;

  const user = new User({ name, age, email, phoneNumber, username, password });

  user.save((err) => {
    if (err) {
      res
        .status(500)
        .send(
          "Error al registrar el usuario (puede haber sido creado anteriormente)"
        );
    } else {
      res.status(200).send("Usuario registrado!!");
      const sendMail = createSendMailGmail();
      const cuenta = MY_GMAIL;
      const asunto = "Nuevo usuario Registrado";

      const info = sendMail({
        to: cuenta,
        subject: asunto,
        text: `Nuevo usuario registrado.
            Nombre: ${name}, Edad: ${age}, Correo: ${email}, Teléfono: ${phoneNumber}, Usuario: ${username}
            `,
        });

      console.log(info);
    }
  });
};

module.exports = { login, register };