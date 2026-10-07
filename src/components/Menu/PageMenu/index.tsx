"use client";
import classNames from "classnames";
import styles from "./style.module.scss";
import { NAV_PAGES } from "./_config";
import { useEffect, useState } from "react";
import QuoteButton from "./QuoteButton";
import MenuBar from "./MenuBar";
import { usePathname } from "next/navigation";
import Logo from "@/components/Image/Logo";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import dynamic from "next/dynamic";
import { isHomePage, isServicePage } from "@/lib/_nav";

const HamburgerMenu = dynamic(() => import("./HamburgerMenu"), { ssr: false });

export default function PageNav () {
    const page = usePathname();
    const isScrollable = isHomePage(page) || isServicePage(page);
    const menu = [NAV_PAGES.PRODUCTS_SERVICES, NAV_PAGES.ABOUT_HEATINGOLOGY, NAV_PAGES.ADVICE_FAQA];
    const [isScrolled, setIsScrolled] = useState(isScrollable ? false : true);
    const { isMobile, isLoading } = useMediaQueries();
    const [ mounted, setMounted ] = useState(false);
    
    useEffect(() => {
        if (isLoading || !mounted) {
            return;
        }
        const onBodyScroll = () => {
            const scrollThreshold = document.getElementById("home-hero")?.clientHeight || 0;
            const currentScrollY = window.scrollY || document.documentElement.scrollTop;
          
            const scrolled = currentScrollY > scrollThreshold;
            setIsScrolled(scrolled);
        };

        if (!isScrollable) {
            setIsScrolled(true);
            return;
        }
        onBodyScroll();
    
        window.addEventListener('scroll', onBodyScroll);
        return () => window.removeEventListener('scroll', onBodyScroll);
    }, [isScrollable, isMobile, isLoading, mounted]);

    useEffect(() => {
        setMounted(true);
    }, [setMounted]);

    if (!mounted || isLoading) {
        return null;
    }

    if (isMobile) {
        return <HamburgerMenu isScrolled={isScrolled} />;
    }

    return (
        <div
            aria-label="Main Navigation"
            className={classNames(styles.navContainer, { [styles.isScrolled]: isScrolled })}
        >
            <Logo className={styles.logo} isColoured={isScrolled} />
            <nav aria-label="Navigation" className={styles.menu}>
                <MenuBar menuData={menu} isScrolled={isScrolled} />
            </nav>
            <QuoteButton />
        </div>
    );
}