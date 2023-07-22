const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectToMongo = () => {
    try{
        mongoose.connect(MONGO_URI);
        console.log("Connected to mongo successfully");
    }
    catch(error){
        console.log(error);
    }
}
module.exports = connectToMongo;