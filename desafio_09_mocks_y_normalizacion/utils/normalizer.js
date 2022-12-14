const normalizr = require("normalizr");


const normalize = normalizr.normalize;
const schema = normalizr.schema;

const author = new schema.Entity("author", { idAttribute: "useremail" });
const mensaje = new schema.Entity("mensaje", { author: author });
const mensajes = new schema.Entity("mensajes", { mensajes: [mensaje] });

const getNormalized = (data) => {  
  return normalize(data, mensajes);
};

module.exports = getNormalized;