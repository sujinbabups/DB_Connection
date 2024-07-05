const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const sample = require('./Models/todoDetails');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const uri = process.env.mongo_uri;
mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('connected', () => {
    console.log('Connected to database');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/add_task', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'addtask.html'));
});
app.get('/update_task/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update_task.html'));
});

app.get('/task/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view_task.html'));
});

app.get('/api/task/:id', async (req, res) => {
    const id = req.params.id;
    const tasks = await sample.findOne({ t_id: id });
    if (!tasks) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(tasks);
});

app.post('/task', async (req, res) => {
    const data = req.body;
    const tasks = await sample.create(data);
    res.redirect('/');
});

app.delete('/api/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task_delete = await sample.findOneAndDelete({ t_id: id });

        if (task_delete) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/task/:id', async (req, res) => {
    const id = req.params.id;
    const { t_id, title, desc } = req.body;
    try {
        const updatTsk = await sample.findOneAndUpdate(
            { t_id: id },
            { t_id, title, desc },
            { new: true }
        );
        if (updatTsk) {
            res.json(updatTsk);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.listen(3009, () => {
    console.log('Server is running on port 3009');
});
