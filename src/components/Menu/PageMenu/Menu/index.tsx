'use client';

import Accordion from "@/components/Accordion";
import { TNavPage } from "../_config";
import styles from './style.module.scss';
import classNames from "classnames";

function MenuButton ({ label }) {
    return <li> { label }</li>;
}

type TMenuAccordion = {
    data: TNavPage, 
    isScrolled?: boolean 
};
function MenuAccordion ({ data, isScrolled }: TMenuAccordion) {
    if (!data.pages) {
        return;
    }

    return (
        <Accordion
            className={classNames(styles.accordionRoot, { [styles.isScrolled]: isScrolled })}
            headerClassName={styles.accordionHeader}
            contentClassName={styles.accordionContent}
            data={[{
                value: data.label,
                trigger: data.label,
                content: data.pages.map((item) => {
                    return <MenuItem key={item.label} data={item} />;
                })
            }]}
        />
    );
}

type TMenuItem = { 
    data: TNavPage; 
    isScrolled?: boolean 
}
export default function MenuItem ({ data, isScrolled }: TMenuItem) {
    const { label } = data;

    if (data.location) {
        return <MenuButton label={label}/>;        
    }
    return <MenuAccordion data={data} isScrolled={isScrolled} />;
    
}