const mongoose = require('mongoose');

// Cache Mongoose connection to reuse it across Serverless function executions
let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myspace');
        cachedConnection = conn;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Removed process.exit(1) because in a Vercel Serverless environment, 
        // deliberately exiting the process causes an unhandled 500 crash
    }
};

module.exports = connectDB;
