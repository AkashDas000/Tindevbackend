const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName :{
        type: String,
        requires: true,
        minLength: 4,
        maxLength: 15
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 15
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        min: 18,
        max: 100
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }

    },
    skills: {
        type: [String],
    }
},{ timestamps: true })

module.exports = mongoose.model("User", userSchema);