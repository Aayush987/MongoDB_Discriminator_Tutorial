const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        const db = mongoose.connection;
        db.on('error',(error) => console.log(error));
        db.once('open',() => console.log("Connected to Database"));
    } catch (error) {
        console.log("Database Connection Failed",error);
        process.exit(1);
    }
}


module.exports =  connectDB;
