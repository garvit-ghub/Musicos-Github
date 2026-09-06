const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');





router.post('/register', registerUser);
router.post('/login', loginUser);

//protect will check if the user is logged in or not and admin will check if the user is admin or not
router.get('/users', protect, admin, getUsers);



module.exports = router;
