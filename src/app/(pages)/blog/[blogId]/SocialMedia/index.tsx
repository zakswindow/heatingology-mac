"use client";

import { useState } from "react";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import Button from "@/components/Button";

const SHARE_LABEL: Partial<Record<ICONS, string>> = {
    [ICONS.COPY_LINK]: "Copy link",
    [ICONS.LINKED_IN]: "LinkedIn",
    [ICONS.TWITTER_X]: "X",
    [ICONS.FACEBOOK]: "Facebook",
};

export default function SocialMedia() {
    const [copied, setCopied] = useState(false);

    const getHandler = (icon: ICONS) => () => {
        const url = window.location.href;

        if (icon === ICONS.COPY_LINK) {
            navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            return;
        }

        const shareUrls: Partial<Record<ICONS, string>> = {
            [ICONS.LINKED_IN]: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            [ICONS.TWITTER_X]: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
            [ICONS.FACEBOOK]: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        };

        const shareUrl = shareUrls[icon];
        if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    const socialMedia = [ICONS.COPY_LINK, ICONS.LINKED_IN, ICONS.TWITTER_X, ICONS.FACEBOOK];

    return (
        <section className={styles.container}>
            <h3 className={styles.label}>Share this post</h3>
            <nav className={styles.socialMedia}>
                {socialMedia.map((item) => (
                    <Button
                        key={item}
                        className={styles.button}
                        onClick={getHandler(item)}
                        title={item === ICONS.COPY_LINK && copied ? "Copied!" : SHARE_LABEL[item]}
                    >
                        <Icon className={styles.icon} icon={item} />
                    </Button>
                ))}
            </nav>
            {copied && <p className={styles.copiedFeedback}>Link copied!</p>}
        </section>
    );
}
