const Schema=require('mongoose');
const {model}=require('mongoose');
const demo= new Schema({
    crt_id:{type :Number,required:true}, //fields
    c_name:{type :String,required:true},
    course:{type :String,required:true},
    grade:{type :String,required:true},
    date:{type :String,required:true},

});

const Certidetails=model('certificate',demo);
module.exports=Certidetails;