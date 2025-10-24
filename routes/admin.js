const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Meal = require('../models/Meal');

// Middleware to check if admin is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.adminId) {
        return next();
    }
    return res.redirect('/admin/login');
};

// Admin Login Page
router.get('/login', (req, res) => {
    if (req.session && req.session.adminId) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin-login');
});

// Admin Login POST
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Update last login
        admin.lastLogin = new Date();
        await admin.save();
        
        // Set session
        req.session.adminId = admin._id;
        req.session.username = admin.username;
        
        res.json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Admin Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('admin-dashboard');
});

// Admin Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Get Dashboard Stats
router.get('/api/stats', isAuthenticated, async (req, res) => {
    try {
        const totalMeals = await Meal.countDocuments();
        const activeMeals = await Meal.countDocuments({ isActive: true });
        const totalAdmins = await Admin.countDocuments();
        
        // Meals by mood
        const mealsByMood = await Meal.aggregate([
            { $group: { _id: '$mood', count: { $sum: 1 } } }
        ]);
        
        // Meals by category
        const mealsByCategory = await Meal.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);
        
        res.json({
            success: true,
            stats: {
                totalMeals,
                activeMeals,
                totalAdmins,
                mealsByMood,
                mealsByCategory
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get All Meals
router.get('/api/meals', isAuthenticated, async (req, res) => {
    try {
        const meals = await Meal.find().sort({ createdAt: -1 });
        res.json({ success: true, meals });
    } catch (error) {
        console.error('Get meals error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get Single Meal
router.get('/api/meals/:id', isAuthenticated, async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        res.json({ success: true, meal });
    } catch (error) {
        console.error('Get meal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create Meal
router.post('/api/meals', isAuthenticated, async (req, res) => {
    try {
        const meal = new Meal(req.body);
        await meal.save();
        res.json({ success: true, message: 'Meal created successfully', meal });
    } catch (error) {
        console.error('Create meal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Meal
router.put('/api/meals/:id', isAuthenticated, async (req, res) => {
    try {
        const meal = await Meal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        
        res.json({ success: true, message: 'Meal updated successfully', meal });
    } catch (error) {
        console.error('Update meal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete Meal
router.delete('/api/meals/:id', isAuthenticated, async (req, res) => {
    try {
        const meal = await Meal.findByIdAndDelete(req.params.id);
        
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        
        res.json({ success: true, message: 'Meal deleted successfully' });
    } catch (error) {
        console.error('Delete meal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Toggle Meal Active Status
router.patch('/api/meals/:id/toggle', isAuthenticated, async (req, res) => {
    try {
        const meal = await Meal.findById(req.params.id);
        
        if (!meal) {
            return res.status(404).json({ success: false, message: 'Meal not found' });
        }
        
        meal.isActive = !meal.isActive;
        await meal.save();
        
        res.json({ success: true, message: 'Meal status updated', meal });
    } catch (error) {
        console.error('Toggle meal error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
