const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const path = require('path');
//swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')
class Server {


    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.swaggerSpec = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Node Documentation API",
                    version: "1.0.0"
                },
                servers: [
                    {
                        url: "http://localhost:8080"
                    }
                ]
            },
            apis: [
                `${path.join(__dirname, '../swagger/*.js')}`
            ],
        }
        this.paths = {
            auth: `/api/auth`,
            user: `/api/user`,
            categories: `/api/categories`,
            product: `/api/product`,
            search: `/api/search`,
            uploads: `/api/uploads`,
            sell: `/api/sell`
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
        this.app.use(this.paths.search, require("../routes/search"));
        this.app.use(this.paths.sell, require("../routes/sell"));
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
        this.app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(this.swaggerSpec)))
    }

}
module.exports = Server;