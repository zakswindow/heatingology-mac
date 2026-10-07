

import Icon, { ICONS } from '@/components/Image/Icons';
import styles from './style.module.scss';
import classNames from 'classnames';

type TSpecsList = {
    specs: string[];
    keyPrefix: string;
    className?: string;
}

export default function SpecsList ({ specs, keyPrefix, className }: TSpecsList) {
    return (
        <ul className={classNames(className, styles.benefits)}>
            {
                specs.map((spec) => {
                    return (
                        <li key={`${keyPrefix}-${spec}`}>
                            <Icon icon={ICONS.CHECK_MARK_FILLED} />
                            <span className={styles.ellipsis}>{ spec }</span>
                        </li>
                    );
                })
            }
        </ul>
    );
}