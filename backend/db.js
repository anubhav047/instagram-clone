const mongoose =require('mongoose');
const {Mongo_uri}=require("./strings");

const connectToMongo = () => {
    try{
        mongoose.connect(Mongo_uri);
        console.log("Connected to mongo successfully");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectToMongo;