import ModelMongoDB from "../modelo/DAOs/pedidos/pedidosMongoDB.js"


class Servicio {
    constructor() {
        this.model =new ModelMongoDB ()
    }


    guardarPedido = async pedido => {
        const pedidoGuardado = await this.model.guardarPedido(pedido)
        return pedidoGuardado
    }

}

export default Servicio