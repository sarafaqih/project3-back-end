const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        required:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    hashedPassword:{
        type:String,
        required:[true,"Password is Required"]
    },
    role:{
        type:String,
        enum:["admin", "customer"],
        // required:true,     
    },
    gender: {
        type:String,
        enum:["female", "male"]
    },
    ContactNo: {
        type: Number,
        // required: true,
      },
})

const User = model("User",userSchema)

module.exports = User