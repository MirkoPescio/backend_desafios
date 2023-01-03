const main = (req, res) => {
	const { username } = req.session;
	req.session.username = username;
	res.render('../../public/views/form.handlebars');
}

const destroy = (req, res) => {
	try {
		req.session.destroy();
		res.render('../../public/views/login.handlebars');
	} catch (err) {
		res.status(500).send('Error: ', err);
	}
}

const signIn = (req, res) => {
	res.render('login')
}

const signUp = (req, res) => {
	res.render('register')
}

module.exports = { main, destroy, signIn, signUp };