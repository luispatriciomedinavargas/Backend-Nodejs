const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: `/api/auth`,
            user: `/api/user`,
            categories: `/api/categories`,
            product: `/api/product`,
            search: `/api/search`,
            uploads: `/api/uploads`
        }


        //Connectar a la base de datos
        this.connectDB();

        //Middlewares = Funciones que añaden otra funcionalidad a nuestro web server
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    routes() {

        this.app.use(this.paths.auth, require("../routes/auth"));
        this.app.use(this.paths.user, require("../routes/user"));
        this.app.use(this.paths.categories, require("../routes/categories"));
        this.app.use(this.paths.product, require("../routes/product"));
        this.app.use(this.paths.uploads, require("../routes/uploads"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());
        //Directorio Publico
        this.app.use(express.static('public'));

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

}
module.exports = Server;