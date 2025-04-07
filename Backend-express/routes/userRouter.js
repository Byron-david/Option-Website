const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { ensureAuthenticated } = require('../utils/middleware'); // Import auth middleware

userRouter.post('/check-username', userController.checkUsername)
userRouter.post('/check-email', userController.checkEmail)

userRouter.get('/users/me', ensureAuthenticated, async (req, res) => {
    // ensureAuthenticated guarantees req.user exists here
    try {
        // Fetch user data again securely from DB if needed,
        // or just return the req.user object if it contains all necessary non-sensitive info
        // req.user is populated by passport deserializeUser function
        const userId = req.user.id; // Passport typically stores user ID here
        const user = await db.getUserById(userId); // Use DB function to get clean data

        if (!user) {
            // Should not happen if authenticated correctly
             return res.status(404).json({ message: "User data not found for authenticated session." });
        }
        res.json(user); // Send back user data (ensure password hash isn't included)

    } catch (error) {
        console.error("Error fetching /users/me:", error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
});

module.exports = userRouter;