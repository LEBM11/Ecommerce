import { ObjectId } from "mongodb"
import CnxMongoDB from "../../DBMongo.js"

class ModelMongoDB {

    constructor() {}

    obtenerProductos = async () => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexión a MongoDB')
        const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
        return productos
    }
    
    obtenerProducto = async id => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexión a MongoDB')
        const producto = await CnxMongoDB.db.collection('productos').findOne({_id: ObjectId.createFromHexString(id)})
        return producto
    }
    
    guardarProducto = async producto => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexión a MongoDB')

        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }
    
    actualizarProducto = async (id, producto) => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexión a MongoDB')

        await CnxMongoDB.db.collection('productos').updateOne(
            {_id: ObjectId.createFromHexString(id)},
            { $set: producto }
        )

        const productoActualizado = await this.obtenerProducto(id)
        return productoActualizado
    }
    
    borrarProducto = async id => {
        if(!CnxMongoDB.connectionOK) throw new Error('DAO son conexión a MongoDB')

        const productoEliminado = await this.obtenerProducto(id)            
        await CnxMongoDB.db.collection('productos').deleteOne({_id: ObjectId.createFromHexString(id)})
        return productoEliminado
    }
}

export default ModelMongoDB