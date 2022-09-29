const mongoose = require("mongoose");

const msgsCollection = "messages";

const authorSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  apellido: String,
  edad: String,
  alias: String
});

const msgsSchema = new mongoose.Schema({
  author: authorSchema,
  text: String,
});

module.exports = { msgsCollection, msgsSchema }