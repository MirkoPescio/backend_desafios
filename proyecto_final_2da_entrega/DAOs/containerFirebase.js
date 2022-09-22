
const admin = require('firebase-admin');
const serviceAccount = require('../db/proyecto-backend---coderhouse-firebase-adminsdk-wekkh-9d0ff676f7.json');
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore');

const firebaseConfig = {
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://proyecto-backend---coderhouse.firebaseio.com'
};

admin.initializeApp(firebaseConfig);

console.log("Conectado a la base de datos de Firebase!!");

class Container {
	constructor() {
		this.db = getFirestore();
	}
	// Guardar un objeto
	save(obj) {
		try {
			// Para la colección productos
		    return this.db.collection('productos').add(obj);
			// Para la colección carritos
			// return this.db.collection('carritos').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	// Obtener un objeto por su ID
	getById(id) {
		try {
			const data = this.db.doc(`/productos/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	// Obtener todos los objetos
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	// Eliminar un objeto
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Container;
