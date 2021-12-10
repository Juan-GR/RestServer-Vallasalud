require('dotenv').config();
const Server = require("./models/Server");

//Inicializamos el server en el archivo principal del servidor Index.js
const server = new Server();

//El servidor empieza a escuchar por el puerto que se ha determinado
server.listen();
