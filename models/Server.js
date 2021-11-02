const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/user';
        
        //Conectar a la base de datos
        this.conectarDB();
        
        // Middlewares - se ejecutan al levantar el server o acceder a una ruta || también usan el metodo use()
        this.middlewares();

        //Rutas de la app
        this.routes();
    }
    
    async conectarDB(){
        await dbConnection();
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
        //El path se describe aquí y no en usuario.routes.js
        this.app.use(this.usuariosPath, require('../routes/usuario.routes'));

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor ejecutándose en el puerto ' + this.port);
        });
    }

}

module.exports = Server;