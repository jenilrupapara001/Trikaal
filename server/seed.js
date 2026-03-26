const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB...');

        const adminExists = await User.findOne({ email: 'admin@trikaal.com' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new User({
            name: 'Acharya Varma',
            email: 'admin@trikaal.com',
            password: 'adminpassword123',
            role: 'admin'
        });

        await admin.save();
        console.log('Admin user created successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
