const login = (req, res, next) => {
	if (req.session?.username) {
		next();
	} else {
		res.render('../views/login.handlebars');
	}
}

module.exports = login;