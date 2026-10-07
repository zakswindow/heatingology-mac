"use client"

import { ExternalLink, Play, Star, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

type VideoReviewData = {
    kind: "video"
    src: string
    posterImage: string
    externalUrl?: string
}

type TextReviewData = {
    kind: "text"
    starRating: number
    review: string
    username: string
    userAvatar: string
    userTitle?: string
    externalUrl?: string
}
export type ReviewCardData = VideoReviewData | TextReviewData

export default function ReviewCard({ data }: { data: ReviewCardData }) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const previewRef = useRef<HTMLVideoElement>(null);
    const isVideo = data.kind == "video";

    useEffect(() => {
        const video = previewRef.current;
        if (!video || !isVideo) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { root: null, threshold: 0.3 }
        );
        observer.observe(video);
        return () => observer.disconnect();
    }, [isVideo]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const dismiss = () => setIsVideoPlaying(false);
        const onFullscreenChange = () => {
            if (!document.fullscreenElement) dismiss();
        };
        video.addEventListener('webkitendfullscreen', dismiss);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => {
            video.removeEventListener('webkitendfullscreen', dismiss);
            document.removeEventListener('fullscreenchange', onFullscreenChange);
        };
    }, [isVideoPlaying]);

    const handleVideoClick = () => {
        if (isVideo) {
            setIsVideoPlaying(true);
        }
    };

    const handleExternalClick = (e: any) => {
        e.stopPropagation();
        if (data.externalUrl) {
            window.open(data.externalUrl, '_blank');
        }
    };

    const renderStars = (starRating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`${styles.star} ${index < starRating ? styles.filled : styles.empty}`}
            />
        ));
    };

    return (
        <>
            <div className={styles.card}>
                {isVideo ? (
                    // Video Card
                    <div className={styles.videoContainer} onClick={handleVideoClick}>
                        <video
                            ref={previewRef}
                            src={data.src}
                            className={styles.posterImage}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={data.posterImage}
                        />
                        <div className={styles.playOverlay}>
                            <div className={styles.playButton}>
                                <Play className={styles.playIcon} />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Review Card
                    <div className={styles.reviewContainer}>
                        <div className={styles.ratingContainer}>
                            {renderStars(data.starRating)}
                        </div>
                        <div className={styles.reviewContent}>
                            <p className={styles.reviewText}>{data.review}</p>
                        </div>
                        <div className={styles.userInfo}>
                            <img
                                src={data.userAvatar}
                                alt={data.username}
                                className={styles.userAvatar}
                            />
                            <div className={styles.userDetails}>
                                <p className={styles.username}>{data.username}</p>
                                <p className={styles.userTitle}>{data.userTitle}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* External link button */}
                {data.externalUrl && (
                    <button className={styles.externalButton} onClick={handleExternalClick}>
                        <ExternalLink className={styles.externalIcon} />
                    </button>
                )}
            </div>

            {/* Video Modal */}
            {isVideo && isVideoPlaying && (
                <div className={styles.videoModal} onClick={() => setIsVideoPlaying(false)}>
                    <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={() => setIsVideoPlaying(false)}>
                            <X />
                        </button>
                        <video
                            ref={videoRef}
                            src={data.src}
                            className={styles.modalVideo}
                            controls
                            autoPlay
                        />
                    </div>
                </div>
            )}
        </>
    );
};