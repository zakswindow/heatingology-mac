'use client';
import { ACTIONS, TAnswer } from "../../_types";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from './style.module.scss';

type TActionTile = {
    item: TAnswer;
    onClick: () => void;
}

function formatPhone(raw: string) {
    return raw.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
}

export default function ActionTile({ item, onClick }: TActionTile) {
    const isCallUs = item.nextNode === ACTIONS.CALL_US;
    const icon = isCallUs ? ICONS.MOBILE : ICONS.PHONE;

    return (
        <button className={styles.button} onClick={onClick}>
            <Icon className={styles.icon} icon={icon} />
            {isCallUs && item.phoneNumber
                ? <span>Call us on <u>{formatPhone(item.phoneNumber)}</u></span>
                : <span>{item.content}</span>
            }
        </button>
    );
}
