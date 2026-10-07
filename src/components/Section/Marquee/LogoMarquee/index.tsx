'use client';

import { motion } from "framer-motion";
import styles from './style.module.css';
import Image from "@/components/Image";

type TImage = {
    src: string;
    alt: string;
}

type TLogoMarquee = { images?: TImage[] }

const logos = [{
    src: "/logos/marquee/1.png",
    alt: "Klarna"
}, {
    src: "/logos/marquee/2.png",
    alt: "Bosch"
}, {
    src: "/logos/marquee/3.png",
    alt: "Worcester"
}, {
    src: "/logos/marquee/4.png",
    alt: "Vaillant"
}, {
    src: "/logos/marquee/5.png",
    alt: "amazon"
}];

export default function LogoMarquee ({ images = logos }: TLogoMarquee) {
    return (
        <div className={styles.container}>

            <motion.section
                className={styles.marquee}
                animate={{ x: [0, -50 + '%'] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 20,
                        ease: "linear"
                    }
                }}
            >
                {
                    [...images, ...images].map((item, index) => {
                        return (
                            <Image
                                type="brand"
                                key={`marquee-${index}`}
                                src={item.src}
                                alt={item.alt}
                            />
                        );
                    })
                }
            </motion.section>
        </div>
    );
}