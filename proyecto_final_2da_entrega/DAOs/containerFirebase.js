
import admin from 'firebase-admin';
import serviceAccount from '../db/proyecto-backend---coderhouse-firebase-adminsdk-wekkh-9d0ff676f7.json';
import { getFirestore, doc, getDoc } from 'firebase-admin/firestore';

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
	// Añadir objetos a una colección
	async save(obj) {
		try {
			// Para la colección productos
		    return this.db.collection('productos').add(obj);
			// Para la colección carritos (descomentar las próximas 2 líneas y comentar la anterior)
			// const cartId = "5tITNjRo1mbEckYqady3";
			// return this.db.collection("carritos").doc(cartId).collection(cartId).add(obj);
			
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

export default Container;