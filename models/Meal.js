const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['breakfast', 'lunch', 'dinner', 'snack', 'dessert','main course','starters']
    },
    mood: {
        type: String,
        required: true,
        enum: ['happy', 'sad', 'energetic', 'calm', 'stressed', 'romantic']
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/400x300?text=Meal+Image'
    },
    ingredients: [{
        type: String
    }],
    calories: {
        type: Number
    },
    prepTime: {
        type: String
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
mealSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Meal', mealSchema);
