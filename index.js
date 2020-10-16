const express = require('express')
const app = express()
const port =4000;
const bodyParser=require('body-parser')
const cors=require('cors')
const pass="arab79";
require('dotenv').config()
console.log(process.env.DB_USER)
app.use(cors());

app.use(bodyParser.json());

var admin = require("firebase-admin");

var serviceAccount = require("./Configs/arab-cf07f-firebase-adminsdk-lckv0-1ff3ebffd5.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arab-cf07f.firebaseio.com"
});




const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y2nyr.mongodb.net/Burj-arab?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true ,useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("Burj-arab").collection("book");
  // perform actions on the collection object
  console.log("successsssds")
 






app.post('/addBooking',(req,res) => {
const newBooking =req.body;
console.log(newBooking)
bookings.insertOne(newBooking)
.then(result => {
  res.send(result.insertedCount >0)
})
})

app.get("/bookings",(req,res) => {
  const bearer=req.headers.authorization;

if(bearer && bearer.startsWith("Bearer ") ){

  const idToken=bearer.split(" ")[1];

  console.log({idToken})
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    let tokenEmail = decodedToken.email;
console.log (tokenEmail,req.query.email)
if(tokenEmail == req.query.email){
  bookings.find({ email:req.query.email})
  .toArray((err,documents)=>{
    res.send(documents)
  })

}
    // ...
  }).catch(function(error) {
    console.log(error)
  });

}

else{

  res.send("unauthorized aceshos")
}




})




// app.get("/bookings",(req, res) => {
//   // console.log(req.query.email)
//     bookings.find({email: req.query.email})
//     .toArray((err,documents)=>{
//       res.send(documents)
//     })
//   })
  




});



app.get('/', (req, res) => {
  res.send('Hello Worlddd!')
})

app.listen(port)