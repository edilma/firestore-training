import functions from "firebase-functions";
 import express from "express"
 import cors from "cors"
 import {getItems, postItem, getOneAuthor} from "./src/sandbox.js"

 const app= express();
 app.use(cors());
 app.use(express.json())
 

//test get -> db is connected
app.get("/test", (req, res)=>{
    res.send("I am Connected")
})
//test all items
app.get("/all", getItems)

 //test get one author
 app.get("/getAuthor", getOneAuthor)


 // test post something
 app.post('/post', postItem)

 
 
 export const api =functions.https.onRequest(app);