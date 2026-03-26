const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const blogs = [
  {
    title: "The Secret of Saptarishis: Navigating Life with the Seven Sages",
    slug: "secret-of-saptarishis",
    category: "Philosophy",
    excerpt: "Beyond the Great Bear lies a cosmic blueprint. Discover how the ancient seers continue to influence the spiritual architecture of the modern seeker.",
    content: `
      <p>In the vast expanse of the night sky, the seven stars of the Saptarishi Mandalam (the Big Dipper) have guided sailors and seekers alike for millennia. But beyond their physical presence lies a profound metaphysical truth that governs our very existence.</p>
      <h2>The Seven Seers</h2>
      <p>According to Vedic lore, the Saptarishis are the "mind-born sons" of Brahma, tasked with upholding the cosmic order (Dharma). Each Rishi represents a specific dimension of consciousness and a unique branch of sacred knowledge.</p>
      <ul>
        <li><strong>Atri:</strong> The seer of the moon and the power of transformation.</li>
        <li><strong>Vashistha:</strong> The master of spiritual discipline and royal mentorship.</li>
        <li><strong>Kashyapa:</strong> The progenitor of all living beings, representing creation.</li>
      </ul>
      <blockquote>"The stars within us reflect the stars above us. To know the Rishis is to know the blueprint of your own soul."</blockquote>
      <p>By understanding the influence of these ancient seers in our birth charts, we can align our modern lives with the timeless rhythms of the universe.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1600",
    tags: ["Philosophy", "Mythology", "Astronomy"],
    readTime: 8,
    author: "Acharya Varma",
    views: 1240
  },
  {
    title: "Vastu for Modern Spaces: Harmonize Your Sanctuary",
    slug: "vastu-modern-spaces",
    category: "Vastu",
    excerpt: "Harmonize your sanctuary without compromising on contemporary aesthetics through these sacred geometric principles.",
    content: `
      <p>Modern architecture often prioritizes form over energy. However, Vastu Shastra teaches us that the spaces we inhabit are living entities that interact with our personal energy fields.</p>
      <h2>The Power of Directions</h2>
      <p>Vastu is not about moving walls; it's about shifting energy. By aligning your home with the cardinal directions, you can invite prosperity and peace.</p>
      <h3>The North-East (Ishanya):</h3>
      <p>Associated with the element of water and the energy of Jupiter. This is the ideal spot for meditation and windows to let in the morning light.</p>
      <h3>The South-West (Nairutya):</h3>
      <p>The zone of stability and earth. Placing heavy furniture or the master bedroom here ensures a grounded and secure life.</p>
      <p>Integrating these principles into a modern minimalist home is easier than it seems. It starts with decluttering and ends with the conscious placement of light and mirrors.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
    tags: ["Vastu", "Interior Design", "Harmony"],
    readTime: 6,
    author: "Acharya Varma",
    views: 890
  },
  {
    title: "Understanding Your Moon Sign: The Emotional Landscape",
    slug: "understanding-moon-sign",
    category: "Astrology",
    excerpt: "In Vedic astrology, the mind is governed by the moon. Learn how Chandra influences your emotional landscape and subconscious patterns.",
    content: `
      <p>While your Sun sign represents your outward ego, your Moon sign (Rashi) is the window into your soul. It governs your emotions, your reactions, and your deepest needs.</p>
      <h2>Why the Moon Matters</h2>
      <p>In Jyotish, the Moon is the most important planet for daily life. It controls the "Manas" or the mind. A strong moon gives emotional resilience, while a challenged moon can lead to anxiety and indecision.</p>
      <ul>
        <li><strong>Moon in Aries:</strong> Impulsive, brave, and quick to react.</li>
        <li><strong>Moon in Cancer:</strong> Deeply intuitive, nurturing, and sensitive.</li>
        <li><strong>Moon in Capricorn:</strong> Disciplined, practical, and emotionally reserved.</li>
      </ul>
      <p>Knowing your Rashi allows you to work <em>with</em> your nature rather than against it. It is the first step toward true self-mastery.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?auto=format&fit=crop&q=80&w=1600",
    tags: ["Astrology", "Self-Care", "Psychology"],
    readTime: 5,
    author: "Acharya Varma",
    views: 2100
  },
  {
    title: "The Science of Mantras: Vibration and Consciousness",
    slug: "science-of-mantras",
    category: "Philosophy",
    excerpt: "Sacred sounds are more than just words. Explore the vibrational physics behind ancient Vedic chants and how they rewire the brain.",
    content: `
      <p>Mantras are often dismissed as simple repetitions, but they are precise acoustic tools designed to alter consciousness. The word "Mantra" literally means "that which protects the mind."</p>
      <h2>Sound as Medicine</h2>
      <p>Every cell in our body vibrates at a specific frequency. When we chant, we create sympathetic resonance within our nervous system. Research shows that specific sounds like "OM" can stimulate the vagus nerve and induce deep relaxation.</p>
      <blockquote>"Everything in the universe is a symphony of vibrations. A mantra is simply a focal point for that symphony."</blockquote>
      <p>Whether it's the <strong>Gayatri Mantra</strong> for clarity or the <strong>Mahamrityunjaya Mantra</strong> for health, these sounds serve as anchors in the stormy sea of modern life.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1514533050035-7930510214c8?auto=format&fit=crop&q=80&w=1600",
    tags: ["Philosophy", "Meditation", "Science"],
    readTime: 7,
    author: "Smeet",
    views: 1560
  },
  {
    title: "Mercury Retrograde: Myth vs Reality",
    slug: "mercury-retrograde-myth-reality",
    category: "Astrology",
    excerpt: "Don't fear the backward motion. Learn how to turn communicative chaos into a period of powerful reflection and recalculation.",
    content: `
      <p>Mercury Retrograde has become a pop-culture scapegoat for everything from broken iPhones to missed flights. But in Vedic Astrology, it's not a "bad" time—it's a "different" time.</p>
      <h2>Return, Reflect, Renew</h2>
      <p>When Mercury appears to move backward, it's an invitation to slow down. The prefix "re-" becomes your best friend.</p>
      <ul>
        <li><strong>Review</strong> your contracts.</li>
        <li><strong>Reconnect</strong> with old friends.</li>
        <li><strong>Re-evaluate</strong> your goals.</li>
      </ul>
      <p>By shifting your perspective from frustration to reflection, you can navigate these 3-week periods with grace and even gain clarity that you missed during the direct phase.</p>
    `,
    featuredImage: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1600",
    tags: ["Astrology", "Productivity", "Tips"],
    readTime: 4,
    author: "Smeet",
    views: 3400
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding blogs...');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('Cleared existing blogs.');

    // Insert new blogs
    await Blog.insertMany(blogs);
    console.log(`Successfully seeded ${blogs.length} blogs!`);

    process.exit();
  } catch (err) {
    console.error('Error seeding blogs:', err);
    process.exit(1);
  }
};

seedBlogs();
