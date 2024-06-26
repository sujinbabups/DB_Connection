const {Schema}=require('mongoose');
const {model}=require('mongoose');
const { type } = require('os');

const vehicle= new Schema({
    service_no:{type:Number},
    vehicle_no:{type:String},
    vehicle_type:{type:String},
    service_date:{type:String},
    est_time:{type:String},
    owner_name:{type:String},
    srv_details:{type:String},

});



const vehicle_info=model('v_Service',vehicle);
module.exports=vehicle_info;