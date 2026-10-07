'use client';
import classNames from "classnames";
import { TAnswer } from "../../_types";
import styles from './style.module.scss';
import { ButtonHTMLAttributes, forwardRef } from "react";
import QuestionnaireImage from "../../ImageIcon";
import Tag, { TAG_TYPES } from "@/components/Tag";
import { formatPriceNumber } from "@/lib/_calculations";
import Tooltip from "@/components/Tooltip";
import Icon, { ICONS } from "@/components/Image/Icons";

type TOption = {
    option: TAnswer;
    onClick: ({ inputValue }: { inputValue?: string }) => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;

const Tile = forwardRef<HTMLButtonElement, TOption>(({ className, option, onClick, ...rest }, ref) => {
    return (
        <button
            ref={ref}
            className={classNames(styles.button, className)}
            onClick={() => onClick({})}
            {...rest}
        >
            { option.icon ? <QuestionnaireImage className={styles.icon} image={option.icon} /> : null }
            { option.content }
            <div className={styles.spacer} />
            {
                (option.priceTag && option.priceTag > 0) ?
                    <Tag tagType={TAG_TYPES.PRICE}>{`+£${formatPriceNumber(option.priceTag)}`}</Tag>
                    : null
            }
            {
                option.tooltip &&
                    <Icon className={styles.tooltipIcon} icon={ICONS.INFO} />
            }
        </button>
    );
});

Tile.displayName = 'Tile';

function OptionTooltip ({ tip }) {
    return (
        <div className={styles.tooltipContainer}>
            <Icon className={styles.tooltipIcon} icon={ICONS.INFO} />
            <div className={styles.metadata}>
                {
                    tip.title && <div className={styles.tooltipTitle}>{tip.title}</div>
                }
                <p className={styles.tooltipDescription}> { tip.content }</p>
            </div>
        </div>
    );
}

export default function OptionTile (props: TOption) {
    const { option } = props;

    if (option.tooltip) {
        return <Tooltip
            trigger={<Tile {...props} />}
            contentProps={{
                side: "bottom",
                align: "start",
                className: styles.tooltipContent 
            }}
        >
            <OptionTooltip tip={option.tooltip} />
        </Tooltip>;
    }

    return <Tile {...props} />;    
}