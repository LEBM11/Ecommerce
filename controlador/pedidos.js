import Servicio from '../servicio/pedidos.js'

class Controlador {
    constructor() {
        this.servicio = new Servicio()
    }

    guardarPedido = async (req, res) => {
        try {
            const pedido = req.body
            const pedidoGuardado = await this.servicio.guardarPedido(pedido)
            res.json(pedidoGuardado)
        }
        catch (error) {
            res.status(500).json({ errMsg: error.message })
        }
    } 

}

export default Controlador