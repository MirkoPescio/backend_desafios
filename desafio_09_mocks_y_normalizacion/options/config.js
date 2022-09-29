const optionsSQLite3 = {
	client: 'sqlite3',
	connection: {
		filename: './db/products.sqlite'
	},
	useNullAsDefault: true
}

const optionsSQLite3Messages = {
	client: 'sqlite3',
	connection: {
		filename: './db/messages.sqlite'
	},
	useNullAsDefault: true
}

module.exports = { optionsSQLite3, optionsSQLite3Messages };