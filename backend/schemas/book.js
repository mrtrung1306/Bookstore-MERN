var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    old_price:Number,
    new_price:Number,
    image:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'author',
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:true
    },

    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});
module.exports = new mongoose.model('book',bookSchema)
//tao bang books trong db