/*
const admin = require('firebase-admin');
const serviceAccount = require('../segunda-entrega-d2c67-firebase-adminsdk-3vy4j-84da86b190.json');
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore');

const firebaseConfig = {
	apiKey: "AIzaSyCk1PF-qeEzFgWKlCLwKEHtB3TgNDwS_r8",
	authDomain: "proyecto-backend---coderhouse.firebaseapp.com",
	projectId: "proyecto-backend---coderhouse",
	storageBucket: "proyecto-backend---coderhouse.appspot.com",
	messagingSenderId: "680838065829",
	appId: "1:680838065829:web:770f54f2fbb9b7881ca74c",
	measurementId: "G-EJEW49WKSW"
};

admin.initializeApp(firebaseConfig);

class Container {
	constructor() {
		this.db = getFirestore();
	}
	//Save an object
	save(obj) {
		try {
			return this.db.collection('productos').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	//Get an object by ID
	getById(id) {
		try {
			const data = this.db.doc(`/productos/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	//Get all objects
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	//Delete one object
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Container;
*/