const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
    // await client.connect();

    const carCollection = client.db('carsDB').collection('cars')
    const infoCollection = client.db('infoDB').collection('info')

    app.post('/car', async(req, res) =>{
        const user = req.body
        console.log(user)
        const result = await carCollection.insertOne(user)
        res.send(result)
    })

    app.get('/car', async(req, res) =>{
      const cursor = carCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    app.put('/car/:id', async(req, res) =>{
      const id = req.params.id
      const filter = { _id: new ObjectId(id)}
      const options1 = {upsert: true}
      const updatedCar = req.body
      console.log(updatedCar)
      const car = {
        $set: {
          name: updatedCar.name,
           brandName:  updatedCar.brandName,
           options: updatedCar.options,
           photo: updatedCar.photo,
           price: updatedCar.price,
           rating: updatedCar.rating,
           description: updatedCar.description
        }
      }
      const result = await carCollection.updateOne(filter, car, options1)
      res.send(result)
    })
    app.get('/car/:id', async(req, res) =>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await carCollection.findOne(query)
      res.send(result)
    })

    app.post('/info', async(req, res)=>{
      const use = req.body
      console.log(use)
      const result = await infoCollection.insertOne(use)
      res.send(result)
    })

    app.get('/info', async(req, res) =>{
      const cursor= infoCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/info/:id', async(req, res)=>{
      const id = req.params.id
      const query = { _id: new ObjectId(id)}
      const result = await infoCollection.findOne(query)
      res.send(result)
    })

    
    app.delete('/info/:id', async(req, res)=>{
      const id = req.params.id
      console.log(id)
      const query = {_id: new ObjectId(id)}
      const result = await infoCollection.deleteOne(query)
      res.send(result)
    })
    

 

    // await client.db("admin").command({ ping: 1 });
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

// infoData -HzFacWP1zMuwrEah





