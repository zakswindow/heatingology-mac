"use client";
import Icon, { ICONS } from "@/components/Image/Icons";
import Logo from "@/components/Image/Logo";
import  styles from "./style.module.scss";
import HamburgerMainMenu from "./MainMenu";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HamburgerSubMenu from "./SubMenu";
import HamburgerMenuBack from "./Back";
import classNames from "classnames";
import QuoteButton from "../QuoteButton";
import { usePathname } from "next/navigation";

export default function HamburgerMenu ({ isScrolled }) {
    const page = usePathname();
    const [ isMainMenuOpen, setIsMainMenuOpen ] = useState<"open" | "closed" | undefined>();
    const [ isSubMenuOpen, setIsSubMenuOpen ] = useState<"open" | "closed" | undefined>();
    const [ selectedMenu, setSelectedMenu ] = useState();
    const [ mounted, setMounted ] = useState(false);
    const [parentEle, setParentEle] = useState<HTMLDivElement | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const onToggleMenu = useCallback(() => {
        setIsMainMenuOpen((prev) => {
            if (!prev) {
                return "open";
            }
            if (prev === "open") {
                return "closed";
            }
            if (prev === "closed") {
                return "open";
            }
        });

        if (isSubMenuOpen === "open") {
            setIsSubMenuOpen("closed");
        }
    }, [isSubMenuOpen]);

    const onSelectMenu = useCallback((item) => {
        setSelectedMenu(item);
        setIsSubMenuOpen("open");
    }, []);

    const onBackToMenu = useCallback(() => {
        setIsSubMenuOpen("closed");
    }, []);

    const onCloseMenu = useCallback(() => {
        setIsMainMenuOpen("closed");
        setIsSubMenuOpen("closed");
    }, []);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    useEffect(() => {
        if (navRef && mounted) {
            setParentEle(navRef.current);
        }
    }, [navRef, mounted]);

    const isSolidMenuBar = isScrolled || isSubMenuOpen || isMainMenuOpen;

    return (
        <div className={styles.nav} id="hamburger-menu" style={{ '--bar-height': `${parentEle?.clientHeight || 0}px` } as React.CSSProperties}>
            <div ref={navRef} className={classNames(styles.menuBar, { [styles.isScrolled]: isSolidMenuBar })}>
                {
                    isSubMenuOpen === "open" ?
                        <HamburgerMenuBack onClick={onBackToMenu} />
                        : <Logo isColoured={Boolean(isSolidMenuBar)} />
                }
                <QuoteButton label={`Home Solutions`} />
                <button onClick={onToggleMenu} className={styles.menuIcon}>
                    <Icon
                        icon={
                            isMainMenuOpen === "open" ? 
                                ICONS.CROSS
                                : ICONS.MENU
                        } 
                        className={styles.icon} />
                </button>
            </div>
            <HamburgerMainMenu isOpen={isMainMenuOpen} onSelect={onSelectMenu} parent={parentEle} />
            <HamburgerSubMenu isOpen={isSubMenuOpen} pages={selectedMenu?.pages} parent={parentEle} onClose={onCloseMenu} />
        </div>
    );
}