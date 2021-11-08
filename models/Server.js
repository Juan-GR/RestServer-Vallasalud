const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/user',
            categorias: '/api/categorias',
            productos: '/api/productos',
            search: '/api/search',
            upload: '/api/upload',
        }

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
        //TODO ESTO SE EJECUTA ANTES DE LLEGAR A LAS RUTAS
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use( express.static('public') );

        //Carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {

        //Middleware condicional
        //El path se describe aquí y no en x.routes.js
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuario.routes'));
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use(this.paths.productos, require('../routes/productos.routes'));
        this.app.use(this.paths.search, require('../routes/search.routes'));
        this.app.use(this.paths.upload, require('../routes/uploads.routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor ejecutándose en el puerto ' + this.port);
        });
    }

}

module.exports = Server;