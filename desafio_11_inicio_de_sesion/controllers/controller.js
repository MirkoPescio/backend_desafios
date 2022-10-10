const form = (req, res) => {
	res.render('form', { username: req.session.username });
};

const home = (req, res) => {
	const { username } = req.body;
	req.session.username = username;
	res.redirect('/');
}

const destroy = (req, res) => {
	try {
		req.session.destroy();
		res.render('../views/login.handlebars');
	} catch (err) {
		res.status(500).send('Error: ', err);
	}
}

module.exports = { form, home, destroy };