const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the doctor's name"]
    },
    specialization: {
        type: String,
        required: [true, "Please add the specialization"]  
    },
    phoneNumber: {
        type: String,
        required: [true, "Please add the phone number"]
    },
    experience: {
        type: Number,
        required: [true, "Please add years of experience"]
    },
    address: {
        type: String,
        required: [true, "Please add the address"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Doctor", doctorSchema)