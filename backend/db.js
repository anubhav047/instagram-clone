const mongoose =require('mongoose');
// const URI = process.env.REACT_APP_MONGO_URI;
const URI = "mongodb://localhost:27017/instagram-clone";


const connectToMongo = () => {
    try{
        mongoose.connect(URI);
        console.log("Connected to mongo successfully");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectToMongo;