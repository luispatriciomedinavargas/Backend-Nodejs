const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.api = '/api'
        this.userRouterPath = `${this.api}/user`;

        //Middlewares = Funciones que añaden otra funcionalidad a nuestro web server
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    routes() {

        this.app.use(this.userRouterPath, require("../routes/user"));
    }
    middlewares() {
        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}
module.exports = Server;