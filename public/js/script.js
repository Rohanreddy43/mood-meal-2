// No longer using hardcoded meal database - fetching from server instead

// Mood emoji mapping
const moodEmojis = {
    happy: '😊',
    sad: '😢',
    stressed: '😰',
    energetic: '⚡',
    romantic: '😍',
    calm: '🧘',
    tired: '😴',
    adventurous: '🤠',
    cozy: '🤗'
};

// Category emoji mapping
const categoryEmojis = {
    breakfast: '🍳',
    lunch: '🍱',
    dinner: '🍽️',
    snack: '🍿',
    dessert: '🍰'
};

// Initialize favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('moodmealFavorites')) || [];

// Function to save favorites to localStorage
function saveFavorites() {
    localStorage.setItem('moodmealFavorites', JSON.stringify(favorites));
}

// Function to check if a meal is in favorites
function isFavorite(mealId) {
    return favorites.some(fav => fav._id === mealId || fav.id === mealId);
}

// Function to toggle favorite
function toggleFavorite(meal) {
    const mealId = meal._id || meal.id;
    const index = favorites.findIndex(fav => (fav._id || fav.id) === mealId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(meal);
    }
    saveFavorites();
}

// Function to create meal card HTML
function createMealCard(meal) {
    const mealId = meal._id || meal.id;
    const isLiked = isFavorite(mealId);
    
    // Use image if available, otherwise use category emoji
    const mealVisual = meal.image && meal.image !== 'https://via.placeholder.com/400x300?text=Meal+Image' 
        ? `<img src="${meal.image}" alt="${meal.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">` 
        : `<div class="meal-emoji">${categoryEmojis[meal.category] || '🍽️'}</div>`;
    
    // Create meal data object for favorites
    const mealData = {
        _id: mealId,
        name: meal.name,
        description: meal.description,
        category: meal.category,
        image: meal.image,
        mood: meal.mood,
        ingredients: meal.ingredients
    };
    
    const mealDataJson = JSON.stringify(mealData).replace(/"/g, '&quot;');
    
    return `
        <div class="meal-card">
            <div class="meal-image">${mealVisual}</div>
            <div class="meal-content">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
                ${meal.category ? `<span class="meal-badge">${categoryEmojis[meal.category] || ''} ${meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}</span>` : ''}
                ${meal.prepTime ? `<span class="meal-info">⏱️ ${meal.prepTime}</span>` : ''}
                ${meal.difficulty ? `<span class="meal-info">📊 ${meal.difficulty}</span>` : ''}
                ${meal.calories ? `<span class="meal-info">🔥 ${meal.calories} cal</span>` : ''}
                
                ${meal.ingredients && meal.ingredients.length > 0 ? `
                    <div class="meal-ingredients">
                        <h4>Ingredients:</h4>
                        <ul>
                            ${meal.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="meal-actions">
                    <button class="favorite-btn ${isLiked ? 'active' : ''}" 
                            onclick='handleFavoriteClick(${mealDataJson})'>
                        ${isLiked ? '❤️ Saved' : '🤍 Save'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Handle favorite button click
function handleFavoriteClick(meal) {
    toggleFavorite(meal);

    // If on meals page, update the button
    if (window.location.pathname.includes('meals')) {
        loadMeals();
    }

    // If on favorites page, reload favorites
    if (window.location.pathname.includes('favorites')) {
        loadFavorites();
    }
}

// Mood selection page - handle mood card clicks
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('mood') || window.location.pathname.endsWith('/')) {
        console.log('Mood page loaded, setting up click handlers...');
        const moodCards = document.querySelectorAll('.mood-card');
        console.log('Found mood cards:', moodCards.length);

        moodCards.forEach(card => {
            card.addEventListener('click', function() {
                const mood = this.getAttribute('data-mood');
                console.log('Mood selected:', mood);
                localStorage.setItem('selectedMood', mood);
                window.location.href = '/meals';
            });

            // Add visual feedback
            card.style.cursor = 'pointer';
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
});

// Meals page - load meals based on selected mood
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('meals')) {
        console.log('Meals page loaded, loading meals...');
        loadMeals();
    }
});

async function loadMeals() {
    const selectedMood = localStorage.getItem('selectedMood') || 'happy';
    
    // Update mood indicator
    const currentMoodElement = document.getElementById('current-mood');
    const moodIndicator = document.querySelector('.mood-indicator h2');
    
    if (currentMoodElement) {
        currentMoodElement.textContent = selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1);
        moodIndicator.innerHTML = `Your Mood: <span id="current-mood" class="gradient-text">${selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}</span> ${moodEmojis[selectedMood] || '😊'}`;
    }
    
    const mealsContainer = document.getElementById('meals-container');
    const noMeals = document.getElementById('no-meals');
    
    try {
        // Show loading state
        mealsContainer.innerHTML = '<div class="loading">Loading meals...</div>';
        mealsContainer.style.display = 'block';
        noMeals.style.display = 'none';
        
        // Fetch meals from API based on mood
        const response = await fetch(`/api/meals/mood/${selectedMood}`);
        const data = await response.json();
        
        if (data.success && data.meals && data.meals.length > 0) {
            mealsContainer.innerHTML = data.meals.map(meal => createMealCard(meal)).join('');
            mealsContainer.style.display = 'grid';
            noMeals.style.display = 'none';
        } else {
            mealsContainer.style.display = 'none';
            noMeals.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading meals:', error);
        mealsContainer.innerHTML = '<div class="error">Failed to load meals. Please try again later.</div>';
    }
}

// Favorites page - load favorite meals
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('favorites')) {
        console.log('Favorites page loaded, loading favorites...');
        loadFavorites();
    }
});

function loadFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    const noFavorites = document.getElementById('no-favorites');
    
    // Reload favorites from localStorage
    favorites = JSON.parse(localStorage.getItem('moodmealFavorites')) || [];
    
    if (favorites.length > 0) {
        favoritesContainer.innerHTML = favorites.map(meal => createMealCard(meal)).join('');
        favoritesContainer.style.display = 'grid';
        noFavorites.style.display = 'none';
    } else {
        favoritesContainer.style.display = 'none';
        noFavorites.style.display = 'block';
    }
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.mood-card, .meal-card, .feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
