// Info.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import style from './style.module.scss';

export default function Info({
    className,
    title,
    description,
    video_url
}: {
    className: string,
    title: string,
    description: string,
    video_url: string
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref: viewRef, inView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (!videoRef.current || !containerRef.current) return;

        const video = videoRef.current;
        const container = containerRef.current;
        const isMobile = window.getComputedStyle(container).getPropertyValue('--is-mobile') === 'true';

        if (isMobile) return;

        if (inView) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [inView]);

    return (
        <section className={className}>
            {
                //This container is needed to check if the user is hovered over or not for video playback
            }
            <div className={style.container} ref={containerRef}>
                <div className={style.panel}>
                    <div className={style.title}>
                        <h1>{title}</h1>
                    </div>
                    <div className={style.description}>
                        <p>{description}</p>
                    </div>
                </div>

                <div className={style.videoWrapper} ref={viewRef}>
                    <video
                        ref={videoRef}
                        src={video_url}
                        className={style.video}
                        muted
                        loop
                        playsInline
                        controls
                    />
                </div>
            </div>
        </section>
    );
}