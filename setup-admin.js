require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function setupAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            console.log('⚠️  An admin user already exists in the database.');
            const overwrite = await question('Do you want to create another admin? (yes/no): ');
            if (overwrite.toLowerCase() !== 'yes') {
                console.log('Setup cancelled.');
                process.exit(0);
            }
        }

        // Get admin details
        console.log('\n📝 Creating a new admin user...\n');
        const username = await question('Enter username: ');
        const email = await question('Enter email: ');
        const password = await question('Enter password: ');
        const role = await question('Enter role (admin/superadmin) [default: admin]: ') || 'admin';

        // Create admin
        const admin = new Admin({
            username,
            email,
            password,
            role
        });

        await admin.save();
        console.log('\n✅ Admin user created successfully!');
        console.log('\n📋 Login Credentials:');
        console.log(`   Username: ${username}`);
        console.log(`   Email: ${email}`);
        console.log(`   Role: ${role}`);
        console.log('\n🔗 You can now login at: http://localhost:3000/admin/login\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        process.exit(1);
    }
}

setupAdmin();
