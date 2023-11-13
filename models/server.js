const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT || 3000;
        this.server = require('http').createServer( this.app );
        this.io     = require('socket.io')( this.server );

        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Directorio publico.
        this.app.use( express.static('public') );

        // Sockets
        this.sockets();
    }

    sockets() {
        this.io.on("connection", socketController);
    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;