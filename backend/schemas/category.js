var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    isDelete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

categorySchema.virtual('published',{
    ref:"book",
    localField:'_id',
    foreignField:'category'
})
categorySchema.set('toJSON',{virtuals:true})
categorySchema.set('toObject',{virtuals:true})
module.exports = new mongoose.model('category',categorySchema)
//tao bang books trong db