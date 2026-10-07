'use client';
import Image from 'next/image';
import { NAV_PAGES } from '../../Menu/PageMenu/_config';
import styles from './style.module.scss';
import MenuItem from '../../Menu/PageMenu/Menu';
import QuoteButton from '../../Menu/PageMenu/QuoteButton';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { NAV_TYPE } from './constants';
import HelpButton from './HelpButton';
import Icon, { ICONS } from '@/components/Image/Icons';
import { LOGOS } from '@/lib/_imageMap';


type TMainNav = { navType: NAV_TYPE; }
export default function MainNav ({ navType }: TMainNav) {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isLogoWhite, setIsLogoWhite] = useState(navType === NAV_TYPE.PAGE);
    const menu = [NAV_PAGES.PRODUCTS_SERVICES, NAV_PAGES.ABOUT_HEATINGOLOGY, NAV_PAGES.ADVICE_FAQA];

    useEffect(() => {
        const onBodyScroll = () => {
            const scrollThreshold = document.getElementById("home-hero")?.clientHeight || 0;
            const currentScrollY = document.body.scrollTop;
      
            const scrolled = currentScrollY > scrollThreshold;
            setIsScrolled(scrolled);
            setIsLogoWhite(scrolled && navType === NAV_TYPE.PAGE);
        };
        // Check initial scroll position
        onBodyScroll();

        document.body.addEventListener('scroll', onBodyScroll);
        return () => document.body.removeEventListener('scroll', onBodyScroll);
    }, [navType]);

    return (
        <div
            aria-label="Main Navigation"
            // className={classNames(styles.navContainer, { 
            //     [styles.isScrolled]: isScrolled && navType !== NAV_TYPE.PAGE,
            //     [styles.isPlain]: navType !== NAV_TYPE.PAGE
            // })}
            className={classNames(styles.navContainer, styles.isScrolled)}
        >
            <Link
                href="/"
                className={styles.logo}
            >
                <Image
                    alt="Heatingology"
                    src={isLogoWhite ? LOGOS.HEATINGOLOGY : LOGOS.HEATINGOLOGY_COLOURED }
                    width={173}
                    height={32}
                />
            </Link>

            {
                navType === NAV_TYPE.PAGE &&
                    <nav aria-label="Navigation" className={styles.menu}>

                        {
                            menu.map((item) => { 
                                return <MenuItem key={item.label} data={item} />;
                            })
                        }
                    </nav>
            }
            {
                navType !== NAV_TYPE.PAGE && <div className={styles.spacer} />
            }

            {
                navType === NAV_TYPE.PAGE ?
                    <QuoteButton />
                    :
                    <HelpButton /> 
                   
            }
        </div>
    );
}