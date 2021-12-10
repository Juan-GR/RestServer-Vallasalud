const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const path = require('path');

class Server {

    constructor() {
        //Se inicializa express
        this.app = express();
        //Se guarda el puerto en el que se ejecutara el servidor
        this.port = process.env.PORT;

        //Rutas de la API REST
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/user',
            hospital: '/api/hospital',
            citas: '/api/citas',
            informes: '/api/informes',
        }

        //Una vez llamamos al objeto server nos conectamos a la base de datos
        this.conectarDB();

        // Middlewares - se ejecutan al levantar el server o acceder a una ruta || también usan el metodo use() - Carga de los middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

        //MiddlewaresClient: Estos deben estar debajo de las rutas y middlewares ya que el modo history(usado en vue para el modulo router) afecta al API REST
        this.middlewaresClient()

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        //TODO ESTO SE EJECUTA ANTES DE LLEGAR A LAS RUTAS
        //CORS para evitar errores al usar cualquier libreria de peticiones como AXIOS
        this.app.use( cors() );

        //Lectura y parseo del body para que lo que me devuelve el servidor sea mas facil de manejar
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));

        //Carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        //Visualizar peticiones HTTP en consola cuando se levanta el servidor
        this.app.use(morgan('tiny'));

    }

    middlewaresClient() {
        //Directorio publico y usamos el modo historia para que no haya problemas con la integracion de VUE y el modo SPA
        this.app.use(history());
        this.app.use(express.static(path.join(__dirname,'../public')));
    }

    routes() {

        //Middleware condicional
        //El path se describe aquí y no en x.routes.js
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.usuarios, require('../routes/usuario.routes'));
        this.app.use(this.paths.hospital, require('../routes/hospital.routes'));
        this.app.use(this.paths.citas, require('../routes/citas.routes'));
        this.app.use(this.paths.informes, require('../routes/informes.routes'));
    }

    listen() {
        // this.app.set('puerto',process.env.PORT || 8080); Si hubiera problemas con el server al subirlo
        // this.app.listen( this.app.get('puerto'),
        this.app.listen( this.port, () => {
            console.log('Servidor ejecutándose en el puerto ' + this.port); //this.app.get('puerto')
        });
    }

}

module.exports = Server;
