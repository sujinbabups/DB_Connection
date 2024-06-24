const express = require('express');
const path = require('path');
const mongoose=require('mongoose');
const sample=require('./Models/todoDetails');
const dotenv=require('dotenv');
dotenv.config();
const app = express();


const uri=process.env.mongo_uri;

mongoose.connect(uri);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add_task', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addtask.html'));
});

app.get('/task/:id', (req, res) => {
    // const id = req.params.id;
    // const task = tasks.find(task => task.TaskID === id);
    // if (!task) {
    //     return res.status(404).send('Task not found');
    // }
    res.sendFile(path.join(__dirname, 'public', 'view_task.html'));
});

app.get('/api/task/:id', async(req, res) => {
    const id = req.params.id;
    const tasks=await sample.findOne({t_id:id})
    console.log(tasks);
    if (!tasks) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(tasks);
});

app.post('/task', async(req, res) => {
   const data=req.body;
   const tasks=await sample.create(data)
   console.log(tasks);
    res.redirect('/');
});

app.delete('/api/task/:id', async(req, res) => {
    const id = req.params.id;
  const tasks=await sample.deleteOne({t_id:id})
    // alert("deleted successfully")
    res.status(204).send();
});
// app.put('/api/task/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const upd=res.body;
//     const taskIndex = tasks.findIndex(task => task.id === upd);
//     if (taskIndex !== -1) {
//         tasks[taskIndex]={...tasks[taskIndex],...upd};
//         res.json(tasks[taskIndex]);

//     }
//     else{
//         res.status(404).json({error:'task not found'});
//     }
   
//     // res.status(204).send();
// });

app.listen(3008, () => {
    console.log("Server is running on port 3008");
});
