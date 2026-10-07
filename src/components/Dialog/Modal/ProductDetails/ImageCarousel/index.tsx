"use client";

import useEmblaCarousel from 'embla-carousel-react';
import styles from "./style.module.scss";
import Banner from '@/components/Image/Banner';
import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Image from '@/components/Image';

export default function ImageCarousel({ images, isMobile }) {
    // Main carousel
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true });
    // Thumbnail carousel
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onThumbClick = useCallback(
        (index) => {
            if (!emblaMainApi || !emblaThumbsApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);
    
    if (!images || images.length <= 0) {
        return null;
    }

    return (
        <>
            {/* Main Carousel */}
            <div className={styles.embla}>
                <div className={styles.emblaViewport} ref={emblaMainRef}>
                    <div className={styles.emblaCntainer}>
                        {images.map((image, index) => (
                            <div className={styles.emblaSlide} key={index}>
                                <Image src={image} alt={"product"} width={530} height={402} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* Dot indicators (mobile only) */}
                {isMobile && images.length > 1 && (
                    <div className={styles.dots}>
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => emblaMainApi?.scrollTo(index)}
                                className={classNames(styles.dot, { [styles.dotSelected]: index === selectedIndex })}
                            />
                        ))}
                    </div>
                )}
            </div>
            {/* Thumbnail Navigation */}
            {
                !isMobile &&
                    <div className={styles.emblaThumbs}>
                        <div className={styles.emblaThumbsViewport} ref={emblaThumbsRef}>
                            <div className={styles.emblaThumbsContainer}>
                                {images.map((image, index) => {
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => onThumbClick(index)}
                                            className={classNames(styles.emblaThumbsSlide, { [styles.isSelected]: index === selectedIndex })}>
                                            <Image src={image} alt={`thumb`} width={530} height={402} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
            }



        </>
    );
}

// export default function ImageCarousel({ images }) {
//     const [emblaRef, emblaApi] = useEmblaCarousel({ 
//         loop: true,
//         skipSnaps: false
//     });

//     const scrollPrev = useCallback(() => {
//         if (emblaApi) emblaApi.scrollPrev();
//     }, [emblaApi]);

//     const scrollNext = useCallback(() => {
//         if (emblaApi) emblaApi.scrollNext();
//     }, [emblaApi]);

//     return (
//         <div className={styles.embla}>
//             <div className={styles.emblaViewport} ref={emblaRef}>
//                 <div className={styles.emblaCntainer}>
//                     {images.map((image, index) => (
//                         <div className={styles.emblaSlide} key={index}>
//                             <Banner bannerUrl={image.src} alt={image.alt} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <button onClick={scrollNext}>
//                 <OutlinedIcon name="arrow_forward_ios" />
//             </button>
//         </div>
//     );
// }

