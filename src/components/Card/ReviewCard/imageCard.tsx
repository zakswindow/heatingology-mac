"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import * as React from "react";

export type UserMeta = {
    avatarUrl: string;
    name: string;
    title?: string;
};

export type ImageItem = {
    type: string;
    src: string;
    alt?: string;
    rating?: number;
    comment?: string;
    user?: UserMeta;
};

export default function ImageItemCard({ item, className }: { item: ImageItem; className?: string }) {
    const [open, setOpen] = React.useState(false);
    const toggle = () => setOpen((v) => !v);
    const rounded = Math.max(0, Math.min(5, Math.round(item.rating ?? 0)));


    return (
        <div className={["review-card", className ?? ""].join(" ")}>
            <button
                type="button"
                onClick={toggle}
                className="rc-mediaButton"
                aria-label={open ? "Hide details" : "Show details"}
            >
                <Image src={item.src} alt={item.alt ?? "Image"} width={1200} height={800} className="rc-media" />
            </button>


            <div className={["rc-overlay", open ? "rc-overlay--open" : "rc-overlay--closed"].join(" ")} aria-hidden={!open}>
                <div className="rc-rating">
                    <div className="rc-stars" aria-label={`Rating ${rounded} out of 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={["rc-star", i < rounded ? "rc-star--filled" : "rc-star--empty"].join(" ")} />
                        ))}
                    </div>
                    <span className="rc-ratingText">{rounded}/5</span>
                </div>


                <div className="rc-comment">
                    {item.comment ? <p className="rc-commentText">{item.comment}</p> : <p className="rc-commentEmpty">No comment.</p>}
                </div>


                {item.user && (
                    <div className="rc-user">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.user.avatarUrl} alt={item.user.name} className="rc-avatar" />
                        <div className="rc-userMeta">
                            <p className="rc-userName">{item.user.name}</p>
                            {item.user.title && <p className="rc-userTitle">{item.user.title}</p>}
                        </div>
                    </div>
                )}
            </div>


            <div className="rc-hint">Click to {open ? "hide" : "show"}</div>
        </div>
    );
}