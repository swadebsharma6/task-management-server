const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS }@cluster0.fikwith.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    // await client.connect();

    const userCollection = client.db("TaskManagementDB").collection("users");
    const taskCollection = client.db("TaskManagementDB").collection("tasks");
    const completeTaskCollection = client.db("TaskManagementDB").collection("completes");
    const ongoingTaskCollection = client.db("TaskManagementDB").collection("ongoing");

    // Users related Api
    app.post('/users', async(req, res)=>{
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result)
  })

  app.get('/users', async(req, res)=>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)
  })

  // task related API
    app.post('/task', async(req, res)=>{
        const item = req.body;
        const result = await taskCollection.insertOne(item);
        res.send(result)
    })

    app.get('/task', async(req, res)=>{
      const cursor = taskCollection.find();
      const result = await cursor.toArray();
      res.send(result)
  });

  // completeTask related Api
  app.post('/complete', async(req, res)=>{
    const item = req.body;
    const result = await completeTaskCollection.insertOne(item);
    res.send(result)
})

app.get('/complete', async(req, res)=>{
  const cursor = completeTaskCollection.find();
  const result = await cursor.toArray();
  res.send(result)
});
  // OngoingTAsk related Api
  app.post('/on-task', async(req, res)=>{
    const item = req.body;
    const result = await ongoingTaskCollection.insertOne(item);
    res.send(result)
})

app.get('/on-task', async(req, res)=>{
  const cursor = ongoingTaskCollection.find();
  const result = await cursor.toArray();
  res.send(result)
});


   


    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Task Management!')
})

app.listen(port, () => {
  console.log(`Task Management listening on port ${port}`)
})