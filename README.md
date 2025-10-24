# MoodMeal 🍽️

**Find the perfect meal for every mood!**

MoodMeal is a web application that helps users discover meal recommendations based on their current emotional state. Whether you're happy, sad, stressed, or energetic, MoodMeal suggests the perfect dishes to match your vibe.

## Features

- **5 Pages:**
  - **Homepage**: Welcome page with project introduction
  - **Mood Selection Page**: Choose from 8 different moods
  - **Meal Suggestions Page**: Get personalized meal recommendations
  - **Favorites Page**: Save and manage your favorite meals
  - **About Page**: Learn more about MoodMeal

- **Interactive Features:**
  - 8 mood categories with unique meal recommendations
  - 48 different meal options across all moods
  - Favorite meals system with localStorage persistence
  - Smooth animations and transitions
  - Fully responsive design
  - Beautiful gradient effects and decorative styling

## Tech Stack

- Pug (formerly Jade) templating engine
- CSS3 (with animations and gradients)
- JavaScript (Vanilla JS)
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Google Fonts (Poppins)

## Local Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the project directory:
```bash
cd moodmeal
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Deployment on Render

### Step 1: Prepare Your Repository

1. Initialize a git repository (if not already done):
```bash
cd moodmeal
git init
git add .
git commit -m "Initial commit"
```

2. Create a repository on GitHub and push your code:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [Render.com](https://render.com) and sign up/login

2. Click **"New +"** and select **"Web Service"**

3. Connect your GitHub repository:
   - Click "Connect account" to link your GitHub
   - Select the `moodmeal` repository

4. Configure the web service:
   - **Name**: moodmeal (or your preferred name)
   - **Region**: Choose the closest region
   - **Branch**: main
   - **Root Directory**: Leave blank or specify `moodmeal` if it's in a subfolder
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Click **"Create Web Service"**

6. Wait for the deployment to complete (usually takes 2-5 minutes)

7. Once deployed, Render will provide you with a URL like:
   ```
   https://moodmeal.onrender.com
   ```

### Step 3: Access Your App

Visit the provided URL to see your MoodMeal application live!

## Project Structure

```
moodmeal/
├── public/
│   ├── index.pug       # Homepage template
│   ├── mood.pug        # Mood selection page template
│   ├── meals.pug       # Meal suggestions page template
│   ├── favorites.pug   # Favorites page template
│   ├── about.pug       # About page template
│   ├── admin-login.pug # Admin login template
│   ├── admin-dashboard.pug # Admin dashboard template
│   ├── css/
│   │   └── style.css   # Main stylesheet
│   └── js/
│       └── script.js   # JavaScript functionality
├── models/
│   ├── Meal.js         # Meal model for MongoDB
│   └── Admin.js        # Admin model for MongoDB
├── routes/
│   └── admin.js        # Admin routes
├── server.js           # Express server
├── populateMeals.js    # Script to populate database with sample meals
├── package.json        # Node.js dependencies
├── .env               # Environment variables
└── README.md          # This file
```

## How to Use

1. **Homepage**: Start by clicking "Start Your Journey"
2. **Select Mood**: Choose how you're feeling from 8 mood options
3. **Browse Meals**: View 6 meal recommendations tailored to your mood
4. **Save Favorites**: Click the heart button to save meals you love
5. **View Favorites**: Access all your saved meals in the Favorites page
6. **Learn More**: Visit the About page to learn about MoodMeal

## Moods & Categories

- 😊 **Happy**: Bright, colorful, and celebratory meals
- 😢 **Sad**: Comfort food that warms the soul
- 😰 **Stressed**: Calming and relaxing food options
- ⚡ **Energetic**: High-energy, protein-packed meals
- 😍 **Romantic**: Elegant meals perfect for date nights
- 😴 **Tired**: Quick and easy meals requiring minimal effort
- 🤠 **Adventurous**: Exotic and bold flavor combinations
- 🤗 **Cozy**: Warm, homely comfort meals

## Features in Detail

### Mood-Based Recommendations
Each mood has 6 carefully curated meal suggestions that match the emotional state.

### Favorites System
- Save unlimited favorite meals
- Favorites persist across sessions using localStorage
- Quick access from any page
- Easy add/remove with a single click

### Responsive Design
- Works perfectly on desktop, tablet, and mobile devices
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Smooth Animations
- Floating emoji animations on homepage
- Hover effects on cards
- Smooth page transitions
- Scroll-based reveal animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a student project for WPM (Web Project Management). Feel free to fork and modify for your own learning purposes.

## License

MIT License - Feel free to use this project for educational purposes.

## Author

Created with ❤️ for food lovers everywhere!

---

**Enjoy using MoodMeal! 🍽️**
