require('dotenv').config();
const mongoose = require('mongoose');
const Meal = require('./models/Meal');

const sampleMeals = [
    // Happy mood meals
    {
        name: 'Chocolate Chip Pancakes',
        description: 'Fluffy pancakes loaded with chocolate chips, perfect for a joyful breakfast.',
        category: 'breakfast',
        mood: 'happy',
        image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop',
        ingredients: ['Flour', 'Milk', 'Eggs', 'Chocolate chips', 'Baking powder', 'Sugar'],
        calories: 450,
        prepTime: '20 minutes',
        difficulty: 'easy',
        rating: 4.8
    },
    {
        name: 'Rainbow Veggie Stir-Fry',
        description: 'Colorful vegetables stir-fried to perfection with a light soy sauce.',
        category: 'lunch',
        mood: 'happy',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        ingredients: ['Bell peppers', 'Broccoli', 'Carrots', 'Soy sauce', 'Garlic', 'Ginger'],
        calories: 280,
        prepTime: '15 minutes',
        difficulty: 'easy',
        rating: 4.6
    },
    {
        name: 'Celebration Cake',
        description: 'Rich chocolate cake with buttercream frosting for special occasions.',
        category: 'dessert',
        mood: 'happy',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        ingredients: ['Flour', 'Cocoa powder', 'Sugar', 'Butter', 'Eggs', 'Vanilla'],
        calories: 380,
        prepTime: '45 minutes',
        difficulty: 'medium',
        rating: 4.9
    },
    // Sad mood meals (comfort food)
    {
        name: 'Mac and Cheese',
        description: 'Creamy, cheesy pasta that feels like a warm hug.',
        category: 'dinner',
        mood: 'sad',
        image: 'https://images.unsplash.com/photo-1551892374-ecf35ba97215?w=400&h=300&fit=crop',
        ingredients: ['Pasta', 'Cheddar cheese', 'Milk', 'Butter', 'Flour', 'Salt'],
        calories: 520,
        prepTime: '25 minutes',
        difficulty: 'easy',
        rating: 4.7
    },
    {
        name: 'Chicken Noodle Soup',
        description: 'Classic comfort soup with tender chicken and vegetables.',
        category: 'lunch',
        mood: 'sad',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        ingredients: ['Chicken', 'Carrots', 'Celery', 'Onion', 'Noodles', 'Chicken broth'],
        calories: 220,
        prepTime: '30 minutes',
        difficulty: 'easy',
        rating: 4.8
    },
    {
        name: 'Warm Apple Pie',
        description: 'Cinnamon-spiced apples in a flaky crust, served warm.',
        category: 'dessert',
        mood: 'sad',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        ingredients: ['Apples', 'Flour', 'Butter', 'Sugar', 'Cinnamon', 'Lemon'],
        calories: 320,
        prepTime: '60 minutes',
        difficulty: 'medium',
        rating: 4.6
    },
    // Energetic mood meals
    {
        name: 'Protein Power Bowl',
        description: 'Quinoa bowl with grilled chicken, avocado, and fresh vegetables.',
        category: 'lunch',
        mood: 'energetic',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        ingredients: ['Quinoa', 'Chicken breast', 'Avocado', 'Spinach', 'Tomatoes', 'Olive oil'],
        calories: 480,
        prepTime: '20 minutes',
        difficulty: 'easy',
        rating: 4.5
    },
    {
        name: 'Green Energy Smoothie',
        description: 'Refreshing smoothie packed with spinach, banana, and protein.',
        category: 'breakfast',
        mood: 'energetic',
        image: 'https://images.unsplash.com/photo-1553909489-cd47e7f36f4a?w=400&h=300&fit=crop',
        ingredients: ['Spinach', 'Banana', 'Protein powder', 'Almond milk', 'Chia seeds'],
        calories: 280,
        prepTime: '5 minutes',
        difficulty: 'easy',
        rating: 4.4
    },
    {
        name: 'Spicy Chicken Wings',
        description: 'Crispy wings with a kick of spice to get your energy going.',
        category: 'snack',
        mood: 'energetic',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        ingredients: ['Chicken wings', 'Hot sauce', 'Butter', 'Garlic powder', 'Flour'],
        calories: 350,
        prepTime: '40 minutes',
        difficulty: 'medium',
        rating: 4.7
    },
    // Calm mood meals
    {
        name: 'Herbal Tea & Biscotti',
        description: 'Soothing chamomile tea with almond biscotti.',
        category: 'snack',
        mood: 'calm',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
        ingredients: ['Chamomile tea', 'Flour', 'Almonds', 'Sugar', 'Butter'],
        calories: 180,
        prepTime: '15 minutes',
        difficulty: 'easy',
        rating: 4.3
    },
    {
        name: 'Mediterranean Salad',
        description: 'Fresh greens with feta, olives, and a light vinaigrette.',
        category: 'lunch',
        mood: 'calm',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        ingredients: ['Mixed greens', 'Feta cheese', 'Olives', 'Cucumber', 'Olive oil', 'Lemon'],
        calories: 220,
        prepTime: '10 minutes',
        difficulty: 'easy',
        rating: 4.6
    },
    {
        name: 'Lavender Honey Yogurt',
        description: 'Creamy yogurt with lavender honey and fresh berries.',
        category: 'dessert',
        mood: 'calm',
        image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop',
        ingredients: ['Greek yogurt', 'Honey', 'Lavender', 'Mixed berries'],
        calories: 190,
        prepTime: '5 minutes',
        difficulty: 'easy',
        rating: 4.4
    },
    // Stressed mood meals
    {
        name: 'Calming Chamomile Tea',
        description: 'Warm chamomile tea to help you relax and unwind.',
        category: 'snack',
        mood: 'stressed',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
        ingredients: ['Chamomile tea', 'Honey', 'Lemon'],
        calories: 20,
        prepTime: '5 minutes',
        difficulty: 'easy',
        rating: 4.2
    },
    {
        name: 'Simple Pasta Aglio e Olio',
        description: 'Easy pasta with garlic and olive oil - no fuss, just comfort.',
        category: 'dinner',
        mood: 'stressed',
        image: 'https://images.unsplash.com/photo-1551892374-ecf35ba97215?w=400&h=300&fit=crop',
        ingredients: ['Spaghetti', 'Garlic', 'Olive oil', 'Red pepper flakes', 'Parsley'],
        calories: 420,
        prepTime: '15 minutes',
        difficulty: 'easy',
        rating: 4.5
    },
    {
        name: 'Dark Chocolate Bark',
        description: 'Simple dark chocolate with nuts and sea salt.',
        category: 'dessert',
        mood: 'stressed',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
        ingredients: ['Dark chocolate', 'Almonds', 'Sea salt'],
        calories: 250,
        prepTime: '10 minutes',
        difficulty: 'easy',
        rating: 4.3
    },
    // Romantic mood meals
    {
        name: 'Candlelit Steak Dinner',
        description: 'Perfectly seared steak with herb butter and roasted vegetables.',
        category: 'dinner',
        mood: 'romantic',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        ingredients: ['Beef steak', 'Butter', 'Rosemary', 'Potatoes', 'Asparagus'],
        calories: 580,
        prepTime: '30 minutes',
        difficulty: 'medium',
        rating: 4.9
    },
    {
        name: 'Strawberry Chocolate Fondue',
        description: 'Rich chocolate fondue with fresh strawberries and marshmallows.',
        category: 'dessert',
        mood: 'romantic',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        ingredients: ['Dark chocolate', 'Heavy cream', 'Strawberries', 'Marshmallows'],
        calories: 320,
        prepTime: '15 minutes',
        difficulty: 'easy',
        rating: 4.8
    },
    {
        name: 'Oysters on the Half Shell',
        description: 'Fresh oysters with mignonette sauce and lemon.',
        category: 'starters',
        mood: 'romantic',
        image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
        ingredients: ['Fresh oysters', 'Shallots', 'Red wine vinegar', 'Lemon'],
        calories: 150,
        prepTime: '10 minutes',
        difficulty: 'easy',
        rating: 4.6
    }
];

async function populateMeals() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing meals
        await Meal.deleteMany({});
        console.log('🗑️ Cleared existing meals');

        // Insert sample meals
        const meals = await Meal.insertMany(sampleMeals);
        console.log(`✅ Successfully added ${meals.length} sample meals to the database`);

        // Display added meals
        console.log('\n📋 Added Meals:');
        meals.forEach((meal, index) => {
            console.log(`${index + 1}. ${meal.name} (${meal.mood} - ${meal.category})`);
        });

        console.log('\n🎉 Database populated successfully!');
        console.log('🔗 You can now visit http://localhost:3000 to see the meals');

    } catch (error) {
        console.error('❌ Error populating database:', error.message);
    } finally {
        await mongoose.connection.close();
        console.log('🔒 Connection closed');
    }
}

populateMeals();
