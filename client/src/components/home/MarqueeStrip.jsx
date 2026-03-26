import React from 'react';

const MarqueeStrip = () => {
    const items = [
        'ॐ असतो मा सद्गमय ।',
        'तमसो मा ज्योति र्गमर्ग य ।',
        'मत्ृयोर्मा अमतृ ं गमय ।',
        'ॐ शान्ति ः शान्ति ः शान्ति ः ॥',
        'Vastu',
        'Trikaal Vastu',
        'Gemstone',
        'Numerology'
    ];

    return (
        <div className="w-full bg-surface-container py-6 overflow-hidden border-y border-primary/10 relative z-20">
            <div className="animate-marquee whitespace-nowrap flex items-center">
                <div className="flex items-center space-x-12 px-6">
                    {items.map((item, i) => (
                        <span key={i} className="text-primary font-headline text-2xl tracking-widest uppercase">{item} •</span>
                    ))}
                </div>
                <div className="flex items-center space-x-12 px-6">
                    {items.map((item, i) => (
                        <span key={i} className="text-primary font-headline text-2xl tracking-widest uppercase">{item} •</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarqueeStrip;
