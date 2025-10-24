# Admin Dashboard Setup Guide

## Overview
The MoodMeal application now includes a complete admin dashboard with MongoDB integration for managing meals and content.

## Features
- **Admin Authentication**: Secure login system with password hashing
- **Dashboard Statistics**: View total meals, active meals, and admin counts
- **Meal Management**: Full CRUD operations for meals
  - Create new meals
  - Edit existing meals
  - Toggle meal active/inactive status
  - Delete meals
- **Meal Properties**:
  - Name, Description
  - Category (breakfast, lunch, dinner, snack, dessert)
  - Mood (happy, sad, energetic, calm, stressed, romantic)
  - Image URL
  - Ingredients list
  - Calories, Prep time, Difficulty, Rating

## Setup Instructions

### 1. Environment Variables
The `.env` file contains your MongoDB connection string and session secret:
```
MONGODB_URI=mongodb+srv://rohan:rohan123@cluster0.pcljbvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=moodmeal_secret_key_change_in_production
PORT=3000
```

⚠️ **Important**: 
- Never commit the `.env` file to Git (it's in .gitignore)
- Change the SESSION_SECRET in production
- Make sure to replace `<rohan123>` with your actual password if needed

### 2. Create Your First Admin User

Run the setup script to create an admin account:

```bash
npm run setup-admin
```

You'll be prompted to enter:
- Username
- Email
- Password
- Role (admin or superadmin)

Example:
```
Enter username: admin
Enter email: admin@moodmeal.com
Enter password: Admin@123
Enter role (admin/superadmin) [default: admin]: admin
```

### 3. Start the Server

```bash
npm start
```

The server will start on port 3000 (or the PORT specified in .env)

### 4. Access the Admin Dashboard

- **Admin Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard (after login)

## Usage Guide

### Logging In
1. Navigate to http://localhost:3000/admin/login
2. Enter your username and password
3. Click "Sign In"

### Managing Meals

#### Adding a New Meal
1. Click the "+ Add Meal" button in the dashboard
2. Fill in the required fields:
   - Meal Name (required)
   - Description (required)
   - Category (required)
   - Mood (required)
3. Optionally add:
   - Image URL
   - Ingredients (comma-separated)
   - Calories
   - Prep Time
   - Difficulty
   - Rating (0-5)
4. Click "Save Meal"

#### Editing a Meal
1. Click the "Edit" button next to any meal in the table
2. Modify the fields as needed
3. Click "Save Meal"

#### Toggling Meal Status
- Click "Toggle" to switch between Active and Inactive
- Inactive meals won't appear on the frontend

#### Deleting a Meal
1. Click "Delete" button
2. Confirm the deletion

### Logging Out
Click the "Logout" button in the top right corner

## API Endpoints

### Public Endpoints
- `GET /api/meals` - Get all active meals
- `GET /api/meals/mood/:mood` - Get active meals by mood

### Admin Endpoints (Require Authentication)
- `POST /admin/login` - Admin login
- `GET /admin/logout` - Admin logout
- `GET /admin/dashboard` - Dashboard page
- `GET /admin/api/stats` - Get dashboard statistics
- `GET /admin/api/meals` - Get all meals (including inactive)
- `GET /admin/api/meals/:id` - Get single meal
- `POST /admin/api/meals` - Create new meal
- `PUT /admin/api/meals/:id` - Update meal
- `DELETE /admin/api/meals/:id` - Delete meal
- `PATCH /admin/api/meals/:id/toggle` - Toggle meal status

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs before storage
2. **Session Management**: Secure session-based authentication
3. **Protected Routes**: Admin routes require authentication
4. **HTTP-Only Cookies**: Session cookies are HTTP-only to prevent XSS

## Troubleshooting

### Can't Connect to MongoDB
- Verify your connection string in `.env`
- Check if MongoDB Atlas IP whitelist includes your IP
- Ensure the password in the connection string is correct

### Admin Setup Fails
- Make sure MongoDB is connected
- Check if the password meets your database's requirements
- Verify all required fields are provided

### Can't Login
- Verify username and password are correct
- Check if admin user was created successfully
- Look for error messages in browser console

### Dashboard Not Loading
- Check if server is running
- Verify MongoDB connection
- Check browser console for errors
- Ensure you're logged in

## Production Deployment

### Environment Variables on Render
Add these environment variables in Render dashboard:
```
MONGODB_URI=your_production_mongodb_uri
SESSION_SECRET=your_secure_random_secret
NODE_ENV=production
```

### Security Checklist
- [ ] Change SESSION_SECRET to a strong random value
- [ ] Use HTTPS in production (Render provides this)
- [ ] Keep MongoDB credentials secure
- [ ] Regularly update dependencies
- [ ] Monitor MongoDB Atlas for unusual activity

## File Structure

```
team project/
├── models/
│   ├── Admin.js          # Admin user model
│   └── Meal.js           # Meal model
├── routes/
│   └── admin.js          # Admin routes and API
├── public/
│   ├── admin-login.html  # Admin login page
│   └── admin-dashboard.html  # Admin dashboard
├── server.js             # Main server file
├── setup-admin.js        # Admin setup script
├── .env                  # Environment variables (not in git)
└── package.json          # Dependencies and scripts
```

## Support

If you encounter any issues:
1. Check the server logs in terminal
2. Check browser console for frontend errors
3. Verify MongoDB connection
4. Ensure all dependencies are installed (`npm install`)
