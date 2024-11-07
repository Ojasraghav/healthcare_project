const express = require('express');
const router = express.Router();
const User = require('../Models/userModel'); // Ensure the correct path to your model

// Route to register a new user
router.post('/register', async (req, res) => {
	try {
		// Destructure data from the request body
		const {
			firstName,
			lastName,
			age,
			bloodGroup,
			gender,
			phoneNumber,
			password
		} = req.body;

		// Create a new user instance
		const newUser = new User({
			firstName,
			lastName,
			age,
			bloodGroup,
			gender,
			phoneNumber,
			password
		});

		// Save the user to the database
		await newUser.save();

		// Send a success response
		res.status(201).json({
			message: 'User registered successfully',
			user: newUser
		});
	} catch (error) {
		console.error(error);

		// Send an error response
		res.status(400).json({
			message: 'Error registering user',
			error: error.message
		});
	}
});

module.exports = router;