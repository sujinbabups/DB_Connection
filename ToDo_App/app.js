const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tasks = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add_task', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addtask.html'));
});

app.get('/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.TaskID === id);
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.sendFile(path.join(__dirname, 'public', 'view_task.html'));
});

app.get('/api/task/:id', (req, res) => {
    const id = req.params.id;
    const task = tasks.find(task => task.TaskID === id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.post('/task', (req, res) => {
    const { TaskID, title, description } = req.body;
    const newTask = { TaskID, title, description };
    tasks.push(newTask);
    res.redirect('/');
});

app.delete('/api/task/:id', (req, res) => {
    const id = req.params.id;
    const taskIndex = tasks.findIndex(task => task.tid === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.status(204).send();
});
app.put('/api/task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const upd=res.body;
    const taskIndex = tasks.findIndex(task => task.id === upd);
    if (taskIndex !== -1) {
        tasks[taskIndex]={...tasks[taskIndex],...upd};
        res.json(tasks[taskIndex]);

    }
    else{
        res.status(404).json({error:'task not found'});
    }
   
    // res.status(204).send();
});

app.listen(3008, () => {
    console.log("Server is running on port 3008");
});
