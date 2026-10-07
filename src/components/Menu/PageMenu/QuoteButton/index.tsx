import Button from "@/components/Button";
import QuoteNav from "./QuoteNav";
import { useCallback, useState } from "react";
import { ProductType } from "@prisma/client";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import classNames from "classnames";
import { SERVICES } from "@/app/(pages)/(home)/Services/config";

export default function QuoteButton ({ label = "Home Solutions" }) {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const onButtonClick = useCallback(() => {
        setIsNavVisible((prev) => !prev);
    }, []);

    const onNavClick = useCallback(() => {
        setIsNavVisible(false);
    }, []);


    return (
        <nav aria-label="Get a fixed price" className={styles.nav}>
            <Button
                onClick={onButtonClick}
                className={classNames(styles.quoteButton,{ [styles.open]: isNavVisible })}> 
                { label }
                <Icon icon={ICONS.CHEVRON_DOWN} className={styles.chevron}/>
            </Button>
            <QuoteNav isVisible={isNavVisible} navigations={SERVICES} onClick={onNavClick} />
        </nav>
    );
}