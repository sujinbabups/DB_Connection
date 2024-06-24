const {Schema}=require('mongoose');
const {model}=require('mongoose');

const demo= new Schema({
    t_id:{type:Number},
    title:{typ:String},
    desc:{type:String},

});

const todoDetails=model('TodoList',demo);
module.exports=todoDetails;