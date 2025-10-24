# MoodMeal Deployment Guide

## Project Structure
Your project is now properly organized:
```
team project/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── index.html
│   ├── mood.html
│   ├── meals.html
│   ├── favorites.html
│   └── about.html
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Step 1: Push to GitHub

### 1.1 Create a New Repository on GitHub
1. Go to https://github.com
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it "moodmeal" (or any name you prefer)
5. DO NOT initialize with README (you already have one)
6. Click "Create repository"

### 1.2 Push Your Code
After creating the repository, run these commands in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/moodmeal.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

If you're using the old master branch name, use:
```bash
git push -u origin master
```

## Step 2: Deploy on Render

### 2.1 Sign Up / Log In to Render
1. Go to https://render.com
2. Sign up or log in (you can use your GitHub account)

### 2.2 Create a New Web Service
1. Click "New +" button in the top right
2. Select "Web Service"
3. Connect your GitHub account if you haven't already
4. Select the repository you just pushed (moodmeal)

### 2.3 Configure the Service
Fill in the following settings:

- **Name**: moodmeal (or your preferred name)
- **Region**: Choose the closest region to you
- **Branch**: main (or master)
- **Root Directory**: Leave blank
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### 2.4 Deploy
1. Click "Create Web Service"
2. Render will automatically deploy your application
3. Wait for the deployment to complete (usually 2-5 minutes)
4. Once deployed, you'll receive a URL like: https://moodmeal.onrender.com

## Testing Your Application

### Local Testing
Your server is currently running on: http://localhost:3000

To test locally:
```bash
npm start
```

### After Deployment
Once deployed on Render:
1. Visit your Render URL
2. Test all pages (Home, Mood, Meals, Favorites, About)
3. Check browser console for any errors

## Important Notes

### Free Tier Limitations
- Render free tier spins down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds to respond
- Consider upgrading to paid tier for production use

### Environment Variables
If you need to add environment variables:
1. Go to your service dashboard on Render
2. Click "Environment"
3. Add your variables (e.g., API keys, database URLs)

### Custom Domain
To add a custom domain:
1. Go to your service settings on Render
2. Click "Custom Domain"
3. Follow the instructions to configure DNS

## Troubleshooting

### Build Fails
- Check that package.json has correct dependencies
- Ensure Node version is compatible (>=14.0.0)

### Application Not Loading
- Check Render logs for errors
- Verify PORT environment variable is being used (our server.js already handles this)

### CSS/JS Not Loading
- Ensure file paths are correct
- Check browser console for 404 errors
- Our structure uses `/css/` and `/js/` paths which should work correctly

## Updating Your Application

To deploy updates:
```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

Render will automatically detect the changes and redeploy.

## Support
- Render Documentation: https://render.com/docs
- GitHub Help: https://docs.github.com
