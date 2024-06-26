const express = require('express');
const path = require('path');
const mongoose=require('mongoose');
const sample=require('./Models/vehicle_Service.js');
const dotenv=require('dotenv');
dotenv.config();
const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri=process.env.mongo_uri;
mongoose.connect(uri)

const db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once("connected",()=>{
    console.log("Connected to database");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/add_vehicle', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add_vehicle.html'));
});

app.get('/show_ser', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'show_ser.html'));
});


app.get('/service/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', ''));
});


app.post('/add-service', async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const service = await sample.create(data);
        res.status(201).redirect('./');
    } catch (error) {
        console.log('error');
        res.status(500).json;
    }
});

 app.get('/api/service/', async (req, res) => {
    try {
        const service = await sample.find();
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load service' });
    }
});


app.get('/api/service/:id', async(req, res) => {
    const id = req.params.id;
    const service=await sample.findOne({vehicle_type:id})
    console.log(service);
    if (!service) {
        return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
});

app.delete('/api/delete/:id', async (req, res) => {
    const service_no =req.params.id; 
    try {
        const result=await sample.findOneAndDelete({ service_no: service_no }); 
        if (result) {
            res.json({ message: 'service deleted successfully' });
        } else {
            res.status(404).json({ error: 'Service  not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

app.put('/api/update/:id', async (req, res) => {
    const service_no = req.params.id; 
    const { est_time, srv_details,} = req.body;
    try {
        const upd_Service = await sample.findOneAndUpdate(
            { service_no: service_no },
            { est_time, srv_details,},
            { new: true }
        );
        if (upd_Service) {
            res.json(upd_Service);
        } else {
            res.status(404).json({ error: 'Service is not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update Service' });
    }
});




port=3014;
app.listen(port)
console.log(`Service starting in ${port}`);

