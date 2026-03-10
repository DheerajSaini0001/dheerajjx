const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/authRoutes');
const memoryRoutes = require('./routes/memoryRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const heroBgRoutes = require('./routes/heroBgRoutes');
const storyRoutes = require('./routes/storyRoutes');
const instagramRoutes = require('./routes/instagramRoutes');

// Instagram cron scheduler
const cron = require('node-cron');
const { syncInstagramPosts } = require('./utils/instagramService');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Local storage static route

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/herobg', heroBgRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/feed', instagramRoutes);

// Error Middleware
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

const PORT = process.env.PORT || 201;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Start Instagram Auto-Feed cron scheduler
    const pollInterval = parseInt(process.env.POLL_INTERVAL_MINUTES) || 5;
    if (process.env.INSTAGRAM_ACCESS_TOKEN) {
        console.log(`[Instagram Cron] Scheduler started — polling every ${pollInterval} minutes`);

        // Run initial sync on startup
        syncInstagramPosts().catch(err =>
            console.error('[Instagram Cron] Initial sync error:', err.message)
        );

        // Schedule recurring sync
        cron.schedule(`*/${pollInterval} * * * *`, async () => {
            console.log(`[Instagram Cron] Scheduled poll triggered at ${new Date().toISOString()}`);
            try {
                await syncInstagramPosts();
            } catch (err) {
                console.error('[Instagram Cron] Poll error:', err.message);
            }
        });
    } else {
        console.log('[Instagram Cron] Skipped — INSTAGRAM_ACCESS_TOKEN not set in .env');
    }
});
