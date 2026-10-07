import MenuCard from "../../MenuBar/MenuCard";
import styles from "./style.module.scss";
import classNames from "classnames";

export default function HamburgerSubMenu ({ pages, isOpen, parent, onClose }) {
    if (!pages) {
        return null;
    }

    return (
        <section
            style={{ marginTop: parent?.clientHeight || 0 }}
            className={classNames(styles.subMenu, {
                [styles.open]: isOpen === "open",
                [styles.closed]: isOpen === "closed"
            })}>
            {
                pages.map((item) => {
                    return <MenuCard key={item.label} {...item} onClick={onClose} />;
                })
            }
        </section>
    );
}