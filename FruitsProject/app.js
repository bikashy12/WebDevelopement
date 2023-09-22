const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/FruitsDB") //  {userNewUrlParser: true;}

// create a new schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required : [true, 'You must enter the name of item']
  },
  rating : {
    type:Number,
    min : 1,
    max : 10
  },
  review : String
})

const Fruit = new mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit(
  {
    name:"Cherry",
    rating :8,
    review : "Red fruit"
  }
)

const pineapple = new Fruit({
  name:"Pineapple",
  rating: 9,
  review : "Great Pineapple"
})
// pineapple.save();

// create the person schema
const personSchema = new mongoose.Schema({
  name: String,
  age : Number,
  favouriteFood : fruitSchema
})

// creating the model name person
const person = new mongoose.model("person", personSchema);
const personDetail = new person({
  name: "John",
  age : 37
})

const newPerson = new person({
  name: "Tom",
  age : 52,
  favouriteFood:  pineapple
})
// newPerson.save();

// Fruit.updateOne({name:"Cherry"},{name:"Peaches"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Updation Done!");
//   }
// });

// Fruit.deleteOne({name:"Peaches"}, function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Deletion Successful");
//   }
// });
//
// person.deleteMany({name:"John"}, (err)=>{
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Deleted all the documents");
//   }
// })

Fruit.find((err, fruits)=>{
  if(err){
    console.log(err);
  }
  else{
    // mongoose.connection.close();
    fruits.forEach(function(fruit){
      if(fruit.name == "Apple"){
      person.updateOne({name:"John"}, {favouriteFood:fruit}, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successfully Added Favourite Food");
        }
      })
      }
      console.log(fruit.name);
    })
  }
})
// mongoose.connection.close();


//**********************************************************Adding the array of documents in the fruits database********************************
// const orange = new Fruit({
//   name: "Orange",
//   rating : 10,
//   review : "Orange orange"
// })
//
// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating : 8,
//   review : "Kiwi fruit"
// })
//
// const banana = new Fruit({
//   name: "Banana",
//   rating : 12,
//   review : "Sweet Banana"
// })
// //
// // Fruit.insertMany([orange, banana, kiwi], function(err){
// //   if(err){
// //     console.log(err);
// //   }
// //   else{
// //     console.log("successfully Added");
// //   }
// // })
// // fruit.save();


//*******************************************************Using MongoDB Native Driver*********************************************************************//
// // cons { MongoClient } = require("mongodb");
// // Connection URI
// const uri = 'mongodb://localhost:27017';
//
// // Create a new MongoClient
// const client = new MongoClient(uri);
//
// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Insert Document
//     const database = client.db("FruitsDB"); //creating database named FruitsDB
//     const fruits = database.collection("fruits"); // Collection here is like table when compared to sql
//     // create a document to insert
//     const docs = [
//           { name: 'Apple', score : 8, review : 'Great fruit'},
//           { name: 'Orange', score : 6, review : 'Kinda Sour'},
//           { name: 'Banana', score : 9, review : 'Great Stuff!'}
//         ];
//         // this option prevents additional documents from being inserted if one fails
//         // const options = { ordered: true };
//         // const result = await fruits.insertMany(docs, options);
//         // console.log(`${result.insertedCount} documents were inserted`);
//         let res = await fruits.find({}, {projection:{_id:0}}).toArray()
//         console.log(res);
//
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
