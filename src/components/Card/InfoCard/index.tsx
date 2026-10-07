"use client"

import Image from 'next/image';
import React, { useState } from "react";
import style from "./style.module.scss";
import Dialog from "@/components/Dialog";
import Button from '@/components/Button';
import styles from './style.module.scss';

type InfoCardData = {
    title: string
    description?: string
    learnMoreText: string
    imageSrc: string
    imageAlt: string
    onLearnMoreClick?: () => void
    redirectUrl?: string
    PopupComponent?: React.ComponentType,
    guideText?: string,
    duration?: string,
    modalContent?: string[]
}

export default function InfoCard({
    data
}: {
    data: InfoCardData
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLearnMoreClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (data.modalContent) {
            setIsModalOpen(true);
        } else if (data.onLearnMoreClick) {
            data.onLearnMoreClick();
        } else if (data.redirectUrl) {
            window.open(data.redirectUrl, '_blank');
        } else if (data.PopupComponent) {
            setShowPopup(true);
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <div
                className={style.card}
                onClick={data.modalContent ? () => setIsModalOpen(true) : undefined}
                style={data.modalContent ? { cursor: 'pointer' } : undefined}
            >
                <div className={style.container}>
                    <Image
                        src={data.imageSrc}
                        alt={data.imageAlt}
                        fill
                        className={style.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className={style.text_wrapper}>
                    {data.guideText &&
                        <div className={style.tips_wrapper}>
                            <p className={style.guide_text}>{data.guideText}</p>
                            <p className={style.duration}>{data.duration}</p>
                        </div>
                    }
                    <h3 className={style.wrapper_title}>{data.title}</h3>
                    {data.description && <p className={style.wrapper_description}>{data.description}</p>}

                    <button
                        className={style.learn_more}
                        onClick={handleLearnMoreClick}
                    >
                        <span>{data.learnMoreText}</span>
                        <svg
                            className={style.arrow}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {data.modalContent && (
                <Dialog
                    rootProps={{ open: isModalOpen, onOpenChange: setIsModalOpen }}
                    title={data.title}
                    contentClassName={style.modalContent}
                >
                    <div>
                        <div className={style.modalImage}>
                            <Image
                                src={data.imageSrc}
                                alt={data.imageAlt}
                                fill
                                className={style.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {data.modalContent.map((paragraph, i) => (
                            <p key={i} className={style.modalText}>{paragraph}</p>
                        ))}
                        <div className={styles.modalFooter}>
                            <Button className={style.modalCloseButton} onClick={() => setIsModalOpen(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}

            {showPopup && data.PopupComponent && React.createElement(data.PopupComponent, {
                isOpen: showPopup,
                onClose: closePopup,
                title: data.title,
            })}
        </>
    );
};
