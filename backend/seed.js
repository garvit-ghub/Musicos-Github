require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const passwordHash = await bcrypt.hash('123456', 10);

    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@musicos.com',
        password: passwordHash,
        role: 'admin',
        verified: true,
      },
      {
        name: 'John Doe',
        email: 'john@musicos.com',
        password: passwordHash,
        role: 'user',
        verified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@musicos.com',
        password: passwordHash,
        role: 'user',
        verified: false,
      },
    ]);

    const products = await Product.insertMany([
      // ── BEGINNER (5) ──
      {
        name: 'Guitar Course - Beginner',
        description: 'Learn the fundamentals of guitar from scratch. Covers basic chords, strumming patterns, and your first songs in 8 weeks.',
        price: 5999,
        category: 'Guitar',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        numReviews: 45,
      },
      {
        name: 'Keyboard Course - Beginner',
        description: 'Master the basics of keyboard playing. Learn hand positioning, scales, chords, and play your favorite melodies.',
        price: 5499,
        category: 'Keyboard',
        stock: 50,
        imageUrl: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        numReviews: 38,
      },
      {
        name: 'Harmonium Course - Beginner',
        description: 'Explore the soulful sounds of harmonium. Ideal for devotional music lovers, covering basics to intermediate techniques.',
        price: 5299,
        category: 'Harmonium',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1544266671-4d2166b22982?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        numReviews: 22,
      },
      {
        name: 'Vocal Training Course - Beginner',
        description: 'Develop your singing voice with professional techniques. Covers breath control, pitch, scales, and performance tips.',
        price: 7999,
        category: 'Vocals',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1761959156737-8e2e7c0ffe99?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        numReviews: 52,
      },
      {
        name: 'Tabla Course - Beginner',
        description: 'Dive into the world of tabla rhythms. Learn basic bols, taals, and develop your sense of Indian classical percussion.',
        price: 6499,
        category: 'Percussion',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1653246577296-3b047aabd8e5?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        numReviews: 19,
      },
      // ── INTERMEDIATE (5) ──
      {
        name: 'Guitar Course - Intermediate',
        description: 'Take your guitar skills to the next level. Covers barre chords, fingerpicking, solos, and advanced strumming.',
        price: 12999,
        category: 'Guitar',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        numReviews: 31,
      },
      {
        name: 'Keyboard Course - Intermediate',
        description: 'Build on your keyboard foundations. Explore arpeggios, pedal techniques, music theory, and play complex arrangements.',
        price: 11499,
        category: 'Keyboard',
        stock: 40,
        imageUrl: 'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&w=800&q=80',
        rating: 4.6,
        numReviews: 27,
      },
      {
        name: 'Violin Course - Intermediate',
        description: 'Advance your violin technique with vibrato, shifting, double stops, and bowing patterns for classical and folk styles.',
        price: 15999,
        category: 'Violin',
        stock: 30,
        imageUrl: 'https://images.unsplash.com/photo-1764973809337-09eec15f08cc?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        numReviews: 24,
      },
      {
        name: 'Drums Course - Intermediate',
        description: 'Level up your drumming with polyrhythms, ghost notes, fills, and groove development across rock, funk, and jazz.',
        price: 10999,
        category: 'Percussion',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1461784121038-f088ca1e7714?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        numReviews: 20,
      },
      {
        name: 'Flute Course - Intermediate',
        description: 'Progress from basics to beautiful melodies. Learn breath control, ornamentation, and raga-based improvisation.',
        price: 9999,
        category: 'Flute',
        stock: 35,
        imageUrl: 'https://images.unsplash.com/photo-1580719653258-26873fde0b4d?auto=format&fit=crop&w=800&q=80',
        rating: 4.5,
        numReviews: 18,
      },
      // ── ADVANCED (5) ──
      {
        name: 'Guitar Course - Advanced',
        description: 'Master advanced techniques including sweep picking, complex chord voicings, composition, and improvisation.',
        price: 24999,
        category: 'Guitar',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        numReviews: 15,
      },
      {
        name: 'Piano Course - Advanced',
        description: 'Master concert-level piano with advanced harmony, sight-reading, improvisation, and performance preparation.',
        price: 29999,
        category: 'Keyboard',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1676031706913-df9602c06105?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        numReviews: 12,
      },
      {
        name: 'Vocal Training Course - Advanced',
        description: 'Professional-level vocal mastery. Covers advanced harmonies, belting, falsetto, live performance, and studio recording.',
        price: 22999,
        category: 'Vocals',
        stock: 25,
        imageUrl: 'https://images.unsplash.com/photo-1777638825556-f8ab2c86586d?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        numReviews: 17,
      },
      {
        name: 'Sitar Course - Advanced',
        description: 'Deep dive into sitar mastery. Explore advanced meend, gamak, raga elaboration, and tala compositions.',
        price: 27999,
        category: 'Sitar',
        stock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1742483377813-a2072eb657bd?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        numReviews: 10,
      },
      {
        name: 'Saxophone Course - Advanced',
        description: 'Elevate your saxophone playing with advanced articulation, jazz improvisation, extended techniques, and ensemble work.',
        price: 21999,
        category: 'Saxophone',
        stock: 20,
        imageUrl: 'https://images.unsplash.com/photo-1471565661762-b9dfae862dbe?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        numReviews: 14,
      },
    ]);

    await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          {
            productID: products[0]._id,
            quantity: 1,
            price: products[0].price,
          },
          {
            productID: products[1]._id,
            quantity: 1,
            price: products[1].price,
          },
        ],
        totalAmount: products[0].price + products[1].price,
        address: {
          fullName: 'John Doe',
          addressLine1: '12 Main Street',
          addressLine2: 'Near City Park',
          city: 'Mumbai',
          state: 'Maharashtra',
          postalCode: '400001',
        },
        paymentId: 'pay_test_001',
        status: 'Pending',
      },
      {
        user: users[2]._id,
        items: [
          {
            productID: products[3]._id,
            quantity: 1,
            price: products[3].price,
          },
          {
            productID: products[4]._id,
            quantity: 1,
            price: products[4].price,
          },
        ],
        totalAmount: products[3].price + products[4].price,
        address: {
          fullName: 'Jane Smith',
          addressLine1: '88 Market Road',
          addressLine2: '',
          city: 'Bengaluru',
          state: 'Karnataka',
          postalCode: '560001',
        },
        paymentId: 'pay_test_002',
        status: 'Shipped',
      },
    ]);

    console.log('Database seeded successfully');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${products.length} courses (5 Beginner, 5 Intermediate, 5 Advanced)`);
    console.log('Created 2 orders');

    const sharedPassword = '123456';

    console.log('=== Seeded Login Credentials ===');
    users.forEach((user) => {
      console.log(`${user.role.toUpperCase()} | Email: ${user.email} | Password: ${sharedPassword}`);
    });
    console.log('================================');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedDatabase();
