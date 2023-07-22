require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.port || 5000;
const connectToMongo = require("./db");
const path = require("path");

app.use(cors());
app.use(express.json());

connectToMongo();

app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
