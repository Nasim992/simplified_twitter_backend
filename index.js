const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;


const port = 5000
const app = express();
 
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const uri = "mongodb+srv://simplified_twitter:simplified_twitter@cluster0.5utuw.mongodb.net/simplified_twitter?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

client.connect(err => {

  const collection = client.db("simplified_twitter").collection("posts");
  // perform actions on the collection object
  console.log("database connected");

  // Registraction 
  app.post('/Register',(req,res)=> { 
    const username = req.body.username;
    const fullname = req.body.fullname;
    collection.insertOne({ username ,fullname })
  })   
  // Registration 

// get Registration data form database  
  app.get('/Registerdata',(req,res)=>{
    collection.find({})
    .toArray((err,document)=>{
      res.send(document) 
  }) 
});
// Get Registration data form database 

// New collection for tweets 
const collectiontweets = client.db("simplified_twitter").collection("tweets");

// Insert tweets to tweets collection
  app.post('/tweet/:id',(req,res)=> {
    const userid = req.params.id;
    const username= req.body.username;
    const fullname=req.body.fullname;
    const tweets = req.body.tweet_text;
    collectiontweets.insertOne({ userid ,username,fullname,tweets,"status":1 })
  })  
// Insert Tweets to tweets collection

//  Show Tweets as a post 
app.get('/tweetdata',(req,res)=>{
  collectiontweets.find({})
  .toArray((err,document)=>{
    res.send(document) 
}) 
});
// Show Tweets as a post 

const collectionfollower = client.db("simplified_twitter").collection("follower");

// Insert Follower  to database  

app.post('/follower',(req,res)=> { 
  const usernameMain = req.body.usernameMain;
  const followerid = req.body._id;
  const followerusername = req.body.username;
  const followerfullname = req.body.fullname;
  collectionfollower.insertOne({ usernameMain,followerid,followerusername,followerfullname})
})   
 
// Insert Follower  to database 


// find follower to the database 
app.get('/findfollower',(req,res)=>{
  collectionfollower.find({})
  .toArray((err,document)=>{
    res.send(document) 
}) 
});
// find follower to the database 





})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})