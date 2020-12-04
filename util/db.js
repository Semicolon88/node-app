const mongoose = require('mongoose')

const connectDB = async ()=>{
    const conn = await mongoose.connect(process.env.MONGO_URL,{
        useFindAndModify: false,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log(`Database connected: ${conn.connection.host}`)
}

module.exports = connectDB