const mongoose = require('mongoose')
const schema = mongoose.Schema

const BagSchema = new mongoose.Schema({
    brandName:{
        type:String
    },
    color:{
        type:String
    },
    price:{
        type:String
    },
    bagImage:{
        type:String
    }
});
const BagModel = mongoose.model("BagModel", BagSchema)
module.exports =BagModel;