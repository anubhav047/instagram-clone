const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 2000;
const connectToMongo = require("./db");

app.use(cors());
app.use(express.json());

connectToMongo();

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.listen(PORT,()=>{
    console.log(`Backend listening on port ${PORT}`)
})