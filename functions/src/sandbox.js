import dbConnect from "./dbConnect.js";

//Get one item by author
export async function getOneAuthor(req,res){
    //const{affirmation} =req.params;
    const db = dbConnect()
    const collection = await db.collection("affirmations").where("author","==","Louise Hay").get()
    const theAffirmations = collection.docs.map(doc=>doc.data())
    res.send(theAffirmations)
}

//get all items
export async function getItems(req,res){
    const db = dbConnect()
    const collection = await db.collection("affirmations").get()
    const theAffirmations = collection.docs.map(doc=>doc.data())
    res.send(theAffirmations)
}
 

export function postItem(req,res){
    const {text,author} = req.body
    const newAffirmation = {
        text, author
    }
    const db = dbConnect();
    db.collection("affirmations").add(newAffirmation)
    .then(doc=>{
        res.status(200).send({
            success: true,
            affirmation: {text,author,id:doc.id}
        })
    })
    .catch(err =>{
        res.status(500).send({
            success: false,
            message: err.message
        })
    })
}