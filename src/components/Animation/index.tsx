"use client";
import Player, { AnimationItem } from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

type TAnimation = {
    src: string;
    type?: "ellipse" | "default",
    scale?: number;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
    onLoaded?: () => void;
    startPlay?: boolean;
    playOnHover?: boolean;
    stopOnLeave?: boolean;
}

export default function Animation ({ src, type = "default", scale = 1, className, onLoaded = () => {}, autoplay = true, loop = false, startPlay = false, playOnHover = false, stopOnLeave = false }: TAnimation) {
    const [isLoaded, setIsLoaded ] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
        if (!containerRef.current || !src) return;

        instanceRef.current = Player.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop,
            autoplay,
            path: src
        });

        const onDataReady = () => {
            setIsLoaded(true);
            onLoaded();
        };

        instanceRef.current.addEventListener("DOMLoaded", onDataReady);

        return () => {
            setIsLoaded(false);
            if (instanceRef.current) {
                instanceRef.current.removeEventListener("DOMLoaded", onDataReady);
                instanceRef.current.destroy();
                instanceRef.current = null;
            }
        };
    }, [src]);

    useEffect(() => {
        if (!instanceRef.current) return;

        if (startPlay) {
            instanceRef.current.play();
        }
    }, [startPlay]);

    useEffect(() => {
        if (!instanceRef.current) return;

        if (playOnHover) {
            instanceRef.current.goToAndPlay(0, true);
        } else if (stopOnLeave) {
            instanceRef.current.goToAndStop(0, true);
        }
    }, [playOnHover, stopOnLeave]);

    return <div
        style={{ scale }}
        ref={containerRef} className={classNames(
            styles.container,
            className,
            {
                [styles.ellipse]: type === "ellipse",
                [styles.loaded]: isLoaded
            }
        )} />;
}