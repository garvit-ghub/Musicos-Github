const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}
const registerUser = async (req, res) => {
    const { name, email, password, role} = req.body;
    try{

        //check user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const role = req.body.role || 'user'; // Default role is 'user' if not provided

        //create new user
        const user = await User.create({ name, email, password: hashedPassword, role });
        if(user){
            const OTP = Math.floor(100000 + Math.random() * 900000).toString();

            const message = 
            `Welcome to Musico!
            Your OTP is: ${OTP}`;

            await sendEmail(
                user.email,
                'Welcome to Musicos',
                `Hello ${user.name}, your account has been created successfully!`
            );

            res.status(201).json({ 
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
        else{
            res.status(400).json({ message: 'Invalid user data' });
        }
        await user.save();
        return res.status(201).json({ message: 'User registered successfully' });


        
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot login user' });
    }
};

const getUsers = async (req, res) => {
    try {
        const user = await User.find({}).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error : Cannot get user' });
    }
};

module.exports = { registerUser, loginUser, getUsers };