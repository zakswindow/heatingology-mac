// Achievements.tsx
'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './style.module.scss';

interface Achievement {
    label: string;
    description: string;
}

interface AchievementsData {
    title: string;
    description: string;
    achievements: Achievement[];
    image_url: string;
}

function NumberTicker({ value, suffix = '' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
        if (!inView || !value) return;

        let current = 0;
        const duration = 1500;
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;
        const increment = value / totalFrames;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 1000 / fps);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span ref={ref} className={style.suffix}>
            {count.toLocaleString('en-US')}
            {suffix}
        </span>
    );
}

export default function Achievements({
    className,
    title,
    description,
    achievements,
    image_url,
}: {
    className: string,
    title: string,
    description: string,
    achievements: Achievement[],
    image_url: string,
}) {

    return (
        <section className={className}>
            <div className={style.leftPanel}>
                <div className={style.header}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>

                <div className={style.grid}>
                    {achievements.map((achievement, index) => (
                        <div key={index} className={style.achievement}>
                            <div className={style.label}>
                                { achievement.label}
                            </div>
                            <div className={style.description}>{achievement.description}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={style.rightPanel}>
                <img src={image_url} />
            </div>
        </section>
    );
}