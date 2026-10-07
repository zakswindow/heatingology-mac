import React from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';
import Icon, { ICONS } from '@/components/Image/Icons';

type TTextInput = { 
    label?: string;
    children?: React.ReactNode;
    error?: React.ReactNode;
    className?: string;
    isDirty?: boolean;
}

export default function TextInput ({ className, isDirty = false, label: inputLabel, children, error, ...inputProps }: TTextInput) {
    return (
        <label
            className={classNames(styles.container, className, {
                [styles.dirty]: isDirty,
                [styles.error]: Boolean(error) 
            })}>
            { inputLabel && <span className={styles.label}> {inputLabel} </span> }
            {
                children ||
                <input
                    type="text"
                    {...inputProps}
                />
            }


            {
                error &&
                    <div className={styles.errorMessage}>
                        <Icon icon={ICONS.CORSS_FILLED} /> 
                        { error } 
                    </div>
            }
        </label>
    );   
}