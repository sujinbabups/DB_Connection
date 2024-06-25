const { log, error } = require('console');
const express = require('express');
const mongoose=require('mongoose');
const sample=require('./Models/empDetails')
const dotenv=require('dotenv');
dotenv.config();
const app=express();
const path = require('path');
const uri=process.env.db_uri

mongoose.connect(uri);
const db=mongoose.connection;
db.on("error",(error)=>{
    console.log(error);
})

db.once("Connected",()=>{
    console.log('Connected to database');
})



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/addEmployee', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'add_employee.html'));
});
app.get('/thankyou', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

app.get('/update_emp', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update_emp.html'));
});

app.get('/employee/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view_employee.html'));
});

app.get('/api/employee/:id', async(req, res) => {
    const id = req.params.id;
    const details=await sample.findOne({emp_id:id})
    // const employee = employees.find(emp => emp.EmployeeID == id);
    // if (!employee) {
    //     return res.status(404).json({ error: 'Employee not found' });
    // }
    // res.json(employee);
});

// app.delete('/api/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const index = employees.findIndex(emp => emp.EmployeeID == id);
//     if (index === -1) {
//         return res.status(404).json({ error: 'Employee not found' });
//     }
//     employees.splice(index, 1);
//     res.status(204).send();
// });

// app.put('/update', (req, res) => {
//     const eid = parseInt(req.params.id);
//     const upId = req.body;
//     console.log(employees);
//     const uIndex = employees.findIndex(employees => emp_id.id === eid);
  
//     if (uIndex !== -1) {
//       users[uIndex] = { ...users[uIndex], ...upId };
//       res.json(users[uIndex]);
//     } else {
//       res.status(404).json({ error: 'Employee  not found' });
//     }
//   });




app.post('/employee', async(req, res) => {
    const data=req.body;
    const details=await sample.create(data)
    res.status(200).redirect('/thankyou')
    // const { EmployeeID, name, role, dateOfJoin } = req.body;
    // const newEmployee = { EmployeeID, name, role, dateOfJoin };
    // employees.push(newEmployee);
    
});
port=3008;
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
