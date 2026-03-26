/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    gold: '#C9A84C',
                    'gold-light': '#F0D080',
                    'gold-dark': '#8B6914',
                },
                cosmic: {
                    purple: '#1A0533',
                    'purple-mid': '#3B0F6B',
                    'purple-light': '#6B3FA0',
                    lavender: '#D6C4F0',
                    'off-white': '#F5F0FF',
                    charcoal: '#0D0118',
                    rose: '#8B2FC9',
                },
            },
            fontFamily: {
                display: ['Cinzel', 'serif'],
                subhead: ['Cormorant Garamond', 'serif'],
                body: ['Raleway', 'sans-serif'],
                accent: ['Josefin Sans', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shimmer': 'shimmer 2s linear infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(201, 168, 76, 0.5)' },
                    '100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.8)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                twinkle: {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 1 },
                },
            },
            backgroundImage: {
                'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #F0D080 50%, #C9A84C 100%)',
                'purple-gradient': 'linear-gradient(135deg, #1A0533 0%, #3B0F6B 50%, #1A0533 100%)',
            },
        },
    },
    plugins: [],
}
