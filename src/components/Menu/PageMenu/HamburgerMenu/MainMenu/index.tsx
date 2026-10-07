import classNames from "classnames";
import { NAV_PAGES } from "../../_config";
import MainMenuItem from "./MainMenuItem";
import styles from "./style.module.scss";
import { useCallback } from "react";

export default function HamburgerMainMenu ({ isOpen, onSelect, parent }) {
    const menuItems = [
        NAV_PAGES.PRODUCTS_SERVICES,
        NAV_PAGES.ABOUT_HEATINGOLOGY,
        NAV_PAGES.ADVICE_FAQA
    ];

    const onItemClick = useCallback((item) => {
        onSelect(item);
    }, [onSelect]);

    return (
        <section
            style={{ marginTop: parent?.clientHeight || 0 }}
            className={classNames(styles.mainMenu, {
                [styles.open]: isOpen === "open",
                [styles.closed]: isOpen === "closed" 
            })}>
            {
                menuItems.map((item) => {
                    return <MainMenuItem key={item.label} menuData={item} onClick={onItemClick} />;
                })
            }
        </section>
    );
}