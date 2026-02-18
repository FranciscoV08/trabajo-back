import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const url = process.env.MONGO_URI
        const {connection} = await mongoose.connect(url)

        // console.log(connection)

        const url2 = `${connection.host}:${connection.port}/${connection.name}`
        console.log(`-----> MongoDB conectado ---> ${url2}`)
    } catch (error) {
        console.log(error)
    }
}