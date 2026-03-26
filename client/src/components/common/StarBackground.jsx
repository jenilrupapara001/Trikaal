import { useEffect, useState } from 'react';

const StarBackground = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const generateStars = () => {
            const newStars = [];
            for (let i = 0; i < 150; i++) {
                newStars.push({
                    id: i,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    size: Math.random() * 2 + 1,
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 2,
                });
            }
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="stars">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDuration: `${star.duration}s`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default StarBackground;
