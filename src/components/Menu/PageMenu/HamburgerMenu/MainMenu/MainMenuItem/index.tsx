import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import { useCallback } from "react";

export default function MainMenuItem ({ menuData, onClick }) {
    const onItemClick = useCallback(() => {
        onClick(menuData);
    }, [onClick, menuData]);

    return (
        <button className={styles.menuItem} onClick={onItemClick}>
            <span> { menuData.label }</span>
            <Icon icon={ICONS.CHEVRON_RIGHT} />
        </button>
    );
}