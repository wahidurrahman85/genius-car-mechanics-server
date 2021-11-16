const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ccrmd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("carMechanics");
    const serviceCollection = database.collection("services");

    //POST API

    app.post("/services", (req, res) => {
      console.log("hit the post api");
      const result = serviceCollection.insertOne(services);
      console.log(result);
      res.josn(result);
    });
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running genius Server");
});

app.listen(port, () => {
  console.log("Running Genius Sever on Port:", port);
});
