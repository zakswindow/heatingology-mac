'use client';

import { ButtonHTMLAttributes, useCallback } from "react";
import styles from './style.module.scss';
import classNames from "classnames";

type TButton = {
    children: React.ReactNode;
    onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: 'default' | 'outline' | "transparent";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button ({ children, onClick, className, variant = 'default', ...props }: TButton) {
    const onButtonClick = useCallback((evt: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(evt);
        }
    }, [onClick]);

    const css = styles[variant];

    return (
        <button 
            onClick={onButtonClick}
            className={classNames(styles.button, css, className, { [styles.disabled]: props.disabled })} 
            {...props}>
            { children }
        </button>
    );
}