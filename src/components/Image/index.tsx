'use client';
import NextImage, { ImageProps } from "next/image";
import styles from './style.module.css';
import classNames from "classnames";

type TImage = {
    type?: "brand" | "product" | "other",
    width?: number;
    height?: number;
    src: string;
} & Omit<ImageProps, "width" | "height" | "src">;


export default function Image ({ className = "", src, type = "other", ...props }: TImage) {
    if (!src) {
        return null;
    }

    if (type === "brand") {
        return (
            <figure className={className}>
                <NextImage
                    className={classNames(className, styles.img)}
                    src={src}
                    width={132}
                    height={71}
                    {...props}
                />
            </figure>
        );
    } 

    if (type === "product") {
        return <figure className={className}>
            <NextImage
                className={classNames(className, styles.img)}
                src={src}
                width={166}
                height={166}
                {...props}
            />
        </figure>;
    }

    return (
        <figure className={className}>
            <NextImage 
                src={src}
                className={classNames(className, styles.img)}
                {...props}
                alt={props.alt || `image` }
                unoptimized={src.includes('.png') ? true : false}
            />
        </figure>
    );
    
}