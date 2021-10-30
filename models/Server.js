const express = require('express')
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/user';
        // Middlewares - se ejecutan al levantar el server o acceder a una ruta || también usan el metodo use()
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public') );

    }

    routes() {

        //Middleware condicional
        //El path se describe aquí y no en user.js
        this.app.use(this.usuariosPath, require('../routes/user'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor ejecutándose en el puerto ' + this.port);
        });
    }

}

module.exports = Server;