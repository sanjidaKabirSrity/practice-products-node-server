const express = require("express");
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// middleWare 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bonkw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
   try {
     await client.connect();
     const database = client.db("products_practice");
     const produtsCollection = database.collection("products_data");

     // GET API
     app.get('/products' , async (req, res)=> {
        const result = await produtsCollection.find({}).toArray();
        console.log('hitting the server' , result)
        res.send(result);
     })

   } finally {
     // await client.close();
   }
 }
run().catch(console.dir);

app.get("/" , (req, res) => {
   res.send("Hello world");
});

app.listen(port , () => {
   console.log("Running Server on port" , port);
});