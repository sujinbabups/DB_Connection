const {Schema}=require('mongoose');
const {model}= require('mongoose');
// const { type } = require('os');

const demo=new Schema({
    b_id:{type:Number,required:true},
    title:{type:String,required:true},
    author:{type:String,required:true},
    content:{type:String,required:true},
});

const Blog_details=model('blog_det',demo);
module.exports=Blog_details;