"use client";
import Button from "@/components/Button";
import styles from './style.module.scss';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ANIMATIONS, QUESTIONNAIRE_ANIMATIONS, SERVICE_IMAGES } from "@/lib/_imageMap";
import Icon, { ICONS } from "@/components/Image/Icons";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Animation from "@/components/Animation";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import { ProductType } from "@prisma/client";
import Image from "@/components/Image";
import Background from "./Background";
import { trackEvent } from "@/lib/analytics";

const COPY: Record<string, { headline: string; content: string[]; benefits: string[] }> = {
    boiler: {
        headline: `Find the Right Boiler for Your Home`,
        content: [
            `We’ll guide you through a few simple questions about your home and heating.`,
            `It takes just a couple of minutes, and you’ll get a clear, fixed price tailored to your property — all online, with no calls or pressure.`
        ],
        benefits: [
            `No sign-up needed to start`,
            `Instant fixed price`,
            `Built around your home`
        ]
    },
    boiler_service: {
        headline: `Let’s find your perfect heating\nsolution, from £50`,
        content: [
            `We’ll ask you a few quick questions about your home and heating needs.\nIt only takes 2–3 minutes, and you’ll get a personalised quote instantly — no phone calls required.`
        ],
        benefits: [
            `Quick and easy service quote`,
            `No personal details needed up front`,
            `Fixed pricing with no surprises`
        ]
    },
    boiler_repair: {
        headline: `Let’s get your boiler fixed, fast ,\nfrom £50`,
        content: [
            `We’ll ask you a few quick questions about your home and heating needs.\nIt only takes 2–3 minutes, and you’ll get a personalised quote instantly — no phone calls required.`
        ],
        benefits: [
            `Quick and easy service quote`,
            `No personal details needed up front`,
            `Fixed pricing with no surprises`
        ]
    },
    ev_charger: {
        headline: `Get your EV charger supplied and installed from £750`,
        content: [
            `Answer a few quick questions about your home, parking setup, and electric vehicle to receive your personalised EV charger quote online.`,
            ` Our simple 2–3 minute process helps you compare EV charging installation options with clear fixed pricing — no phone calls or home surveys required to get started.`
        ],
        benefits: [
            `Fast online EV charger installation quote`,
            `Fixed pricing with professional installation`,
            `Compatible with leading electric vehicle brands`,
            `No obligation and no hidden costs`
        ]
    },
    heatPump: {
        headline: `Let’s get your home heat-pump\nready ,from £5,000`,
        content: [
            `We’ll ask you a few quick questions about your home and heating needs.\nIt only takes 2–3 minutes, and you’ll get a personalised quote instantly — no phone calls required.`
        ],
        benefits: [
            `Quick and easy service quote`,
            `No personal details needed up front`,
            `Fixed pricing with no surprises`,
        ]
    },
    default: {
        headline: `Let’s find your perfect heating solution,\nfrom £50`,
        content: [
            `We’ll ask you a few quick questions about your home and heating needs.`,
            `It only takes 2–3 minutes, and you’ll get a personalised quote instantly — no phone calls required.`
        ],
        benefits: [
            `No personal details needed up front`,
            `Instant online quote`,
            `Tailored to your home`
        ]
    }
};

export default function Onboard ({ onStart, productType }) {
    const { headline, content, benefits } = COPY[productType] ?? COPY.default;
    const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);
    const { isLoading: isMediaQueriesLoading, isMobile, isDesktop } = useMediaQueries();
    const [ animationScale, setAnimationScale ] = useState(1);
    const [animationSrc, setAnimationSrc] = useState<string>("");

    useEffect(() => {
        if (isMobile) {
            setAnimationSrc(QUESTIONNAIRE_ANIMATIONS.ONBOARDING_MOBILE);
        } else if (isDesktop) {
            setAnimationSrc(QUESTIONNAIRE_ANIMATIONS.ONBOARDING_DESKTOP);
        }
    }, [isMobile, isDesktop]);

    useEffect(() => {
        if (productType !== ProductType.boiler || animationSrc === QUESTIONNAIRE_ANIMATIONS.ONBOARDING_MOBILE) {
            setIsAnimationLoaded(true);
        }
    }, [productType, animationSrc]);

    return (
        <>
            {
                (!isAnimationLoaded || isMediaQueriesLoading) && <Loading />
            }
            <section aria-label="Start to get quote" className={classNames(styles.section, { [styles.loaded]: isAnimationLoaded })}>
                {
                    productType === ProductType.boiler && animationSrc !== QUESTIONNAIRE_ANIMATIONS.ONBOARDING_MOBILE ?
                        <Animation className={styles.bannerAnimation}
                            src={animationSrc}
                            type="ellipse" autoplay={true}
                            onLoaded={() => {
                                setIsAnimationLoaded(true);
                            }}
                        />
                        :
                        <Background productType={productType} />
                }          
                <div className={classNames(styles.onboard, styles[productType])}>
                    <h1 className={styles.headline}> {headline}</h1>
                    <div className={styles.content}>
                        {
                            content.map((item) => {
                                return (<p key={item}>{ item }</p>);
                            })
                        }
                    </div>
                    <ul className={styles.specsContainer}>
                        {
                            benefits.map((item) => {
                                return (<li key={item} className={styles.specs}> { item }</li>);
                            })
                        }
                    </ul>
                </div>
                <Button className={styles.button} onClick={() => { trackEvent('quote_started', { product_type: productType }); onStart(); }}>
                    Get Started
                    <Icon icon={ICONS.ARROW_RIGHT} />
                </Button>
                <p className={styles.footer}> 
                    {`or `}
                    <a href="tel:03335770017" className={styles.tel}>call us</a>
                    {` for expert help`} 
                </p>

            </section>
        </>
    );
}