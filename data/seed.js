// // seed.js
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// // Hash the passwords before saving
// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// };

// // Create admin user if it doesn't exist
// const createAdmin = async () => {
//   const adminExists = await User.findOne({ email: 'admin@kookieskitchen.com' });
//   if (!adminExists) {
//     const hashedPassword = await hashPassword('adminpassword'); // Default admin password
//     const admin = new User({
//       email: 'admin@kookieskitchen.com',
//       password: hashedPassword,
//       role: 'admin',
//     });
//     await admin.save();
//     console.log('Admin user created successfully!');
//   }
// };

// // Create a regular user if it doesn't exist
// const createUser = async () => {
//   const userExists = await User.findOne({ email: 'user@kookieskitchen.com' });
//   if (!userExists) {
//     const hashedPassword = await hashPassword('userpassword'); // Default user password
//     const user = new User({
//       email: 'user@kookieskitchen.com',
//       password: hashedPassword,
//       role: 'user',
//     });
//     await user.save();
//     console.log('Regular user created successfully!');
//   }
// };

// // Connect to DB and seed the users
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('Connected to DB');

//     // Create admin and regular users
//     await createAdmin();
//     await createUser();

//     // Close the DB connection after seeding
//     process.exit();
//   })
//   .catch(err => {
//     console.error('Error during data seeding:', err);
//     process.exit(1);
//   });

// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Hash the passwords before saving
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Create admin user if it doesn't exist
const createAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@kookieskitchen.com' });
  if (!adminExists) {
    const hashedPassword = await hashPassword('adminpassword');
    const admin = new User({
      email: 'admin@kookieskitchen.com',
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Admin user created successfully!');
  }
};

// Create regular users if they don't exist
const createUsers = async () => {
  const user1Exists = await User.findOne({ email: 'user1@kookieskitchen.com' });
  if (!user1Exists) {
    const hashedPassword = await hashPassword('user1password');
    const user1 = new User({
      email: 'user1@kookieskitchen.com',
      password: hashedPassword,
      role: 'user',
    });
    await user1.save();
    console.log('User 1 created successfully!');
  }

  const user2Exists = await User.findOne({ email: 'user2@kookieskitchen.com' });
  if (!user2Exists) {
    const hashedPassword = await hashPassword('user2password');
    const user2 = new User({
      email: 'user2@kookieskitchen.com',
      password: hashedPassword,
      role: 'user',
    });
    await user2.save();
    console.log('User 2 created successfully!');
  }
};

// Connect to DB and seed the users
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB');

    await createAdmin();
    await createUsers();

    // Close the DB connection after seeding
    process.exit();
  })
  .catch(err => {
    console.error('Error during data seeding:', err);
    process.exit(1);
  });
