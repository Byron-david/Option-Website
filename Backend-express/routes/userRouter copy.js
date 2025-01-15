// route file - routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// You can for example add a top level middleware function that handles say authentication and only let the request come in if they're authenticated
// This prevents from executing the middleware functions below if the request is not authenticated
// We will learn more about authentication in later lessons
// usually calls either next() or next(error)

// router.use(authMiddleware);

// router-level midd lewares

// GET request for getting all the users
router.get('/', userController.getUsers);

// You will likely place your validation/authentication middleware functions here or perhaps in the controller file, e.g.
// router.post(validationMiddleware, userController.createUser)

// POST request for creating a user
router.post('/', userController.createUser);

// GET request for getting the user by id
router.get('/:id', userController.getUserById);

module.exports = router;
