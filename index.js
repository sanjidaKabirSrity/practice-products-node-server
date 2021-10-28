const express = require("express");
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require("cors");

const app = express();
const port = process.env.Port || 5000;

// middleWare 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bonkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/" , (req, res) => {
   res.send("Hello world");
});

app.listen(port , () => {
   console.log("Running Server on port" , port);
});