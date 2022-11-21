const { optionsSQLite3 } = require("../options/config.js");
const knex = require('knex')(optionsSQLite3);

/*
knex.from('products').where('id', '=', '1').del()
	.then(() => console.log('Producto eliminado'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())

*/

knex.from('products').del()
	.then(() => console.log('Productos eliminados'))
	.catch(err => { console.log(err); throw err })
	.finally(() => knex.destroy())