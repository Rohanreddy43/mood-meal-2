require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'moodmeal_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Admin routes
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

// Route for home page
app.get('/', (req, res) => {
    res.render('index');
});

// Route for mood selection page
app.get('/mood', (req, res) => {
    res.render('mood');
});

// Route for meals page
app.get('/meals', (req, res) => {
    res.render('meals');
});

// Route for favorites page
app.get('/favorites', (req, res) => {
    res.render('favorites');
});

// Route for about page
app.get('/about', (req, res) => {
    res.render('about');
});

// API endpoint to get meals (for the frontend)
app.get('/api/meals', async (req, res) => {
    try {
        const Meal = require('./models/Meal');
        const meals = await Meal.find({ isActive: true });
        res.json({ success: true, meals });
    } catch (error) {
        console.error('Error fetching meals:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// API endpoint to get meals by mood
app.get('/api/meals/mood/:mood', async (req, res) => {
    try {
        const Meal = require('./models/Meal');
        const meals = await Meal.find({ 
            mood: req.params.mood,
            isActive: true 
        });
        res.json({ success: true, meals });
    } catch (error) {
        console.error('Error fetching meals by mood:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🍽️ MoodMeal server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
    console.log(`Admin dashboard: http://localhost:${PORT}/admin/login`);
});
