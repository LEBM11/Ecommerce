import express from 'express'

import RouterProductos from './router/productos.js'
import RouterPedidos from './router/pedidos.js'

import config from './config.js'
import CnxMongoDB from "./modelo/DBMongo.js";

import cors from 'cors'


class Server {

    start() {
        const app = express()
        app.use(cors())

        app.use(express.static('public')) // archivos estáticos en public

        app.use(express.json())

        // ---------------- Rutas / endpoints API RESTful ------------
        app.use('/api/productos', new RouterProductos().config())
        app.use('/api/pedidos', new RouterPedidos().config())

        // -------------- Listen del servidor Express ------------------
        console.log('process.env.REACT_APP_PORT_SRV_DEV:', process.env.REACT_APP_PORT_SRV_DEV)

        const url = process.env.NODE_ENV === 'production'
                    ? ``                         
                    : `http://localhost:${config.PORT}`   

        const server = app.listen(config.PORT, () => console.log(`Servidor ApiRESTful escuchando en ${url}`))
        server.on('error', error => console.log(`Error en servidor: ${error.message}`))
    }
}

new Server().start() 

if(config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}