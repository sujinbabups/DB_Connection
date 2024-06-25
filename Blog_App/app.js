const express = require('express');
const path= require('path');
const mongoose=require('mongoose');
const sample=require('./Models/Blog.js')
const dotenv=require('dotenv');
const { error } = require('console');
dotenv.config();

const app = express();


const uri=process.env.mongo_uri;
mongoose.connect(uri);

const db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once("connected",()=>{
    console.log("Connected to database");
})

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'))
})

// app.get('/viewallblogs', (req, res) => {
//     res.send(blogPosts)
// })

app.get('/blog/:id', (req,res) => {
    // const id = req.params.id;
    // const blogs = blogPosts.find((blog) => blog.BlogID == id);
    // if (!blogs) {
    //   return res.status(404).send("Blog not found");
    // }
  
    res.sendFile(path.join(__dirname, 'public', 'viewblog.html'));
})

app.get('/api/blog/:id', async(req,res) => {
    const id = req.params.id;
   const details=await sample.findOne({b_id:id})
    res.json(details);
})

app.post('/blog',async (req,res) => {
   try{
    const data=req.body;
    const details=await sample.create(data)
    res.status(201).redirect('/submitted');
   }
   catch(error){
    res.status(500).json
   }
    
})

app.listen(3000, () => {
    console.log("The server is starting")
})