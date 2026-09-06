const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { otpVerificationEmail, otpResendEmail } = require('../utils/emailTemplates');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

const OTP_EXPIRY_MINUTES = 10;
const RESEND_COOLDOWN_SECONDS = 10;
const MAX_OTPS_PER_WINDOW = 10;
const RATE_LIMIT_WINDOW_MS = 30 * 60 * 1000; // 30 minutes

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const role = req.body.role || 'user';

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            otp: OTP,
            otpExpiry,
            otpSentAt: [new Date()],
        });

        if (user) {
            const emailContent = otpVerificationEmail(user.name, OTP, OTP_EXPIRY_MINUTES);

            await sendEmail(
                user.email,
                emailContent.subject,
                emailContent.text,
                emailContent.html
            );

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id),
                requiresVerification: true,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'Account already verified' });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: 'No OTP found. Please register again.' });
        }

        if (new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'OTP has expired. Please resend a new one.' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        user.verified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            verified: true,
            token: generateToken(user._id),
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const resendOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verified) {
            return res.status(400).json({ message: 'Account already verified' });
        }

        const now = new Date();
        const recentOtps = user.otpSentAt.filter(
            (date) => now - new Date(date) < RATE_LIMIT_WINDOW_MS
        );

        if (recentOtps.length >= MAX_OTPS_PER_WINDOW) {
            return res.status(429).json({ message: 'Too many OTP requests. Please try again after 30 minutes.' });
        }

        if (recentOtps.length > 0) {
            const lastSent = new Date(recentOtps[recentOtps.length - 1]);
            const elapsed = (now - lastSent) / 1000;
            if (elapsed < RESEND_COOLDOWN_SECONDS) {
                return res.status(429).json({
                    message: `Please wait ${Math.ceil(RESEND_COOLDOWN_SECONDS - elapsed)} seconds before resending.`,
                });
            }
        }

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

        user.otp = OTP;
        user.otpExpiry = otpExpiry;
        user.otpSentAt.push(now);
        await user.save();

        const emailContent = otpResendEmail(user.name, OTP, OTP_EXPIRY_MINUTES);

        await sendEmail(
            user.email,
            emailContent.subject,
            emailContent.text,
            emailContent.html
        );

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                verified: user.verified,
                token: generateToken(user._id),
            });
        } else {
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

module.exports = { registerUser, verifyOTP, resendOTP, loginUser, getUsers };
