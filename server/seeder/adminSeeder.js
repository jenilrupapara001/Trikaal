import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Horoscope from '../models/Horoscope.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();
        console.log('Connected to database');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@cosmicguru.com' });

        if (adminExists) {
            console.log('Admin user already exists');
        } else {
            // Create admin user
            const admin = await User.create({
                name: 'Admin',
                email: 'admin@cosmicguru.com',
                password: 'admin123',
                role: 'admin',
            });
            console.log('Admin user created:', admin.email);
        }

        // Check if services exist
        const serviceCount = await Service.countDocuments();
        if (serviceCount === 0) {
            // Create sample services
            const services = [
                {
                    title: 'Natal Chart Reading',
                    slug: 'natal-chart-reading',
                    shortDescription: 'Complete birth chart analysis revealing your cosmic blueprint',
                    fullDescription: 'A comprehensive natal chart reading that maps the positions of all planets at your time of birth. This reading reveals your core personality traits, strengths, challenges, and life purpose. It includes analysis of your Sun sign, Moon sign, Rising sign, and the aspects between all planets.',
                    category: 'vedic',
                    icon: '🗺️',
                    price: '₹3,500',
                    duration: '90 minutes',
                    isActive: true,
                    faqs: [
                        { question: 'What information do I need?', answer: 'You need your exact date, time, and place of birth.' },
                        { question: 'How will I receive the reading?', answer: 'You will receive a detailed PDF document via email within 3-5 business days.' }
                    ]
                },
                {
                    title: 'Tarot Card Reading',
                    slug: 'tarot-card-reading',
                    shortDescription: 'Insightful tarot sessions for guidance and clarity',
                    fullDescription: 'A powerful tarot reading using the Rider-Waite deck to gain insight into your past, present, and future. Whether you seek answers about love, career, finances, or spiritual growth, the cards will provide guidance and clarity.',
                    category: 'tarot',
                    icon: '🃏',
                    price: '₹2,000',
                    duration: '60 minutes',
                    isActive: true,
                    faqs: [
                        { question: 'What type of questions can I ask?', answer: 'You can ask about any area of your life - love, career, finances, relationships, etc.' },
                        { question: 'Is tarot reading accurate?', answer: 'Tarot readings are highly accurate when read by an experienced reader.' }
                    ]
                },
                {
                    title: 'Numerology Analysis',
                    slug: 'numerology-analysis',
                    shortDescription: 'Discover the mystical meaning behind your numbers',
                    fullDescription: 'A detailed numerology report based on your name and birth date. Discover your Life Path Number, Expression Number, Soul Urge Number, and how they influence your destiny. Learn about your strengths, challenges, and opportunities.',
                    category: 'numerology',
                    icon: '🔢',
                    price: '₹2,500',
                    duration: '60 minutes',
                    isActive: true,
                },
                {
                    title: 'Vastu Consultation',
                    slug: 'vastu-consultation',
                    shortDescription: 'Harmonize your living space with cosmic energies',
                    fullDescription: 'A complete Vastu analysis of your home or office. Identify imbalances in energy flow and receive remedies to create harmony, prosperity, and well-being in your living space.',
                    category: 'vastu',
                    icon: '🏠',
                    price: '₹5,000',
                    duration: '120 minutes',
                    isActive: true,
                },
                {
                    title: 'Kundali Matching',
                    slug: 'kundali-matching',
                    shortDescription: 'Compatibility analysis for marriage and relationships',
                    fullDescription: 'A detailed Kundali matching report for marriage compatibility. Analyze gunas, mangal dosha, and overall compatibility between partners for a successful and harmonious marriage.',
                    category: 'kundali',
                    icon: '💑',
                    price: '₹4,000',
                    duration: '90 minutes',
                    isActive: true,
                },
                {
                    title: 'Love Compatibility',
                    slug: 'love-compatibility',
                    shortDescription: 'Understand your relationship dynamics',
                    fullDescription: 'A comprehensive compatibility analysis comparing two birth charts to determine relationship harmony, strengths, challenges, and potential for long-term compatibility.',
                    category: 'compatibility',
                    icon: '❤️',
                    price: '₹3,000',
                    duration: '75 minutes',
                    isActive: true,
                },
            ];

            await Service.insertMany(services);
            console.log('Sample services created');
        }

        // Check if horoscopes exist
        const horoscopeCount = await Horoscope.countDocuments();
        if (horoscopeCount === 0) {
            // Create sample daily horoscopes
            const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
            const horoscopes = [];
            const today = new Date();

            for (const sign of signs) {
                horoscopes.push({
                    sign,
                    type: 'daily',
                    date: today,
                    content: `Today brings new opportunities for ${sign}. Focus on self-improvement and personal growth. The stars align to support your endeavors.`,
                    luckyColor: ['Red', 'Gold', 'Blue', 'Green'][Math.floor(Math.random() * 4)],
                    luckyNumber: Math.floor(Math.random() * 99) + 1,
                    compatibility: signs[Math.floor(Math.random() * signs.length)],
                });
            }

            await Horoscope.insertMany(horoscopes);
            console.log('Sample horoscopes created');
        }

        // Check if testimonials exist
        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            // Create sample testimonials
            const testimonials = [
                {
                    name: 'Priya Sharma',
                    location: 'Mumbai',
                    rating: 5,
                    content: 'The natal chart reading was incredibly accurate! It helped me understand myself better and make better life decisions. Highly recommended!',
                    status: 'approved',
                },
                {
                    name: 'Rahul Verma',
                    location: 'Delhi',
                    rating: 5,
                    content: 'Excellent tarot reading session. The insights provided were spot on and gave me clarity on my career path.',
                    status: 'approved',
                },
                {
                    name: 'Anjali Patel',
                    location: 'Ahmedabad',
                    rating: 4,
                    content: 'Very detailed Kundali matching for my marriage. The analysis was comprehensive and helpful.',
                    status: 'approved',
                },
            ];

            await Testimonial.insertMany(testimonials);
            console.log('Sample testimonials created');
        }

        console.log('Database seeded successfully!');
        console.log('Admin login: admin@cosmicguru.com / admin123');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error.message);
        process.exit(1);
    }
};

seedAdmin();
