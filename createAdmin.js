// createAdmin.js
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

(async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'rohan' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists, skipping creation.');
    } else {
      const admin = new Admin({
        username: 'rohan',
        email: 'rohan@example.com',
        password: 'admin123', // plain password; it will be hashed automatically
        role: 'admin',
      });

      await admin.save();
      console.log('🎉 Admin user created successfully!');
      console.log('👉 Username: rohan');
      console.log('👉 Password: admin123');
    }
  } catch (err) {
    console.error('❌ Error creating admin:', err);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Connection closed');
  }
})();
