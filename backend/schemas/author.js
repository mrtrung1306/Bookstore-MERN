var mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    year:{
        type:Number,
        required: true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

authorSchema.virtual('published',{
    ref:"book",
    localField:'_id',
    foreignField:'author'
})
authorSchema.set('toJSON',{virtuals:true})
authorSchema.set('toObject',{virtuals:true})
module.exports = new mongoose.model('author',authorSchema)
//tao bang books trong db