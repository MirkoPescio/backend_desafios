const { optionsSQLite3Messages } = require('../options/config.js');
const knex = require('knex')(optionsSQLite3Messages);

knex.schema.createTable('messages', table => {
	table.increments("id").primary();
      table.dateTime("dateTime");
      table.string("email");
      table.string("text");
})
	.then(() => console.log('Tabla creada!!'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())