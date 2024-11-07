const asyncHandler = require("express-async-handler");
const Doctor = require("../model/doctorsDetailsModel");

// @desc    Register a new doctor
// @route   POST /api/doctors
// @access  Public
const registerDoctor = asyncHandler(async (req, res) => {
    const { name, specialization, phoneNumber, experience, address } = req.body;

    if (!name || !specialization || !phoneNumber || !experience || !address) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const doctor = await Doctor.create({
        name,
        specialization,
        phoneNumber,
        experience,
        address
    });

    res.status(201).json({ message: "Doctor registered successfully", doctor });
});

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
});

module.exports = { registerDoctor, getDoctors };