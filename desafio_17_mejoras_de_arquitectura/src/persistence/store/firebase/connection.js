const admin = require('firebase-admin')
const { config } = require('./config.js')

const serviceAccount = config.FIREBASE_KEY

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

console.log('Connection to Firebase successful')
