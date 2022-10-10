const User = require("../views/js/user.js");


const login = (req, res) => {

	const { username, password } = req.body;

    User.findOne({username}, (err, user) => {
        if (err) {
            res.status(500).send('Error al autenticar el usuario');
        } else if (!user) {
            alert("El usuario no existe");
            res.render('../views/register.handlebars');
        } else {
            user.isCorrectPassword(password, (err, result) => {
                if (err) {
                    res.status(500).send('Error al autenticar');
                } else if (result) {
                    res.render('../views/form.handlebars', { username: req.body.username });
                } else {
                    res.status(500).send('Usuario y/o contraseña incorrectos');
                }
            });
        }
    });
}

const register = (req, res) => {
	const { username, password } = req.body;

    const user = new User({ username, password });

    user.save(err => {
        if (err) {
            res.status(500).send('Error al registrar el usuario (puede haber sido creado anteriormente)');
        } else {
            res.status(200).send('Usuario registrado!!');
        }
    });
}

module.exports = { login, register };