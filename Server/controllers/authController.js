const asyncHandler = require('express-async-handler');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Generate JWT for authenticated session
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: '30d',
    });
};

// @desc    Step 1: Send OTP to Admin's Gmail
// @route   POST /api/auth/send-otp
// @access  Public
const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Please provide an email address');
    }

    // Usually, in a real app, you'll verify this is the ONLY admin email.
    // For demo/development purpose, if no admin exists, we'll create one just to test the flow,
    // or you can pre-seed an admin account in MongoDB.
    let admin = await Admin.findOne({ email });

    if (!admin) {
        // Remove this in pure production if you don't want strangers making 'Admin' accounts
        // We auto-create since there is no 'Seed' step provided currently.
        admin = await Admin.create({
            email,
            password: 'mocked_password_since_otp_is_used',
        });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash it for saving in DB (Optional, but good practice). Here we'll just store plain for simplicity,
    // or you can hash it just like a password. We will store plain here as usually OTP expires fast.
    admin.otp = otp;
    admin.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await admin.save();

    // Send the email using Nodemailer
    const message = `
        You are attempting to log into the Dheerajj.x Admin Command Center.
        
        Your One-Time Password (OTP) is: ${otp}
        
        This code is valid for 10 minutes.
        Do not share this with anyone.
    `;

    try {
        await sendEmail({
            email: admin.email,
            subject: 'Admin Login - Verification Code (OTP)',
            message,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #4f46e5;">Dheerajj.x Command Center</h2>
                    <p>You are attempting to access the admin portal.</p>
                    <p>Your authentication code is:</p>
                    <h1 style="font-size: 32px; letter-spacing: 4px; border: 1px solid #ccc; padding: 10px; display: inline-block; border-radius: 8px;">${otp}</h1>
                    <p>This code is valid for the next 10 minutes.</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #888;">If this wasn't you, please ignore this email or review your server security.</p>
                </div>
            `
        });

        res.status(200).json({ success: true, message: 'OTP sent to email.' });
    } catch (error) {
        admin.otp = undefined;
        admin.otpExpiry = undefined;
        await admin.save();

        console.error('Email send failed:', error);
        res.status(500);
        throw new Error('Email could not be sent. Check backend Nodemailer logs.');
    }
});

// @desc    Step 2: Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error('Please provide email and OTP');
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        res.status(401);
        throw new Error('Admin not found');
    }

    if (admin.otp !== otp) {
        res.status(401);
        throw new Error('Invalid OTP');
    }

    if (admin.otpExpiry < Date.now()) {
        res.status(401);
        throw new Error('OTP has expired');
    }

    // Success - clear OTP fields
    admin.otp = undefined;
    admin.otpExpiry = undefined;
    await admin.save();

    res.status(200).json({
        _id: admin.id,
        email: admin.email,
        token: generateToken(admin._id),
    });
});

// @desc    Get current admin data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    // req.user is set by your authMiddleware (which you'll need to update to use Admin model)
    res.status(200).json({ message: 'User data display', user: req.user });
});

module.exports = {
    sendOtp,
    verifyOtp,
    getMe,
};
