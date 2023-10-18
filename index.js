const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('car server is running 123')
})


    
const uri = "mongodb+srv://carProject:C6ZX8kKSlOLPdEEe@cluster0.zelnjpd.mongodb.net/?retryWrites=true&w=majority";

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
    await client.connect();

    const carCollection = client.db('carsDB').collection('cars')

    app.post('/car', async(req, res) =>{
        const user = req.body
        console.log(user)
        const result = await carCollection.insertOne(user)
        res.send(result)
    })



    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);







app.listen(port, () =>{
    console.log(`server is running on port: ${port}`)
})



// C6ZX8kKSlOLPdEEe