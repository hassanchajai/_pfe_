
const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please fill the client name"]
    },
    fluide:{
        type:String,
        required:[true,"Please fill the client fluide"]
    },
    n_compte:{
        type:String,
        required:[true,"Please fill the client n_compte"]
    },
    date_compte:{
        type:Date,
        default:new Date().now
    },
    reference:{
        type:String,
        enum:["ref_sec","ref_trn","ref_ord","loc_id"],
        required:[true,"Please fill the client reference"]
    },
    emails:[
        {
            type:String,
        }
    ]
},{timestamps:true});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;

