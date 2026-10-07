import * as RadixTooltip from '@radix-ui/react-tooltip';
import styles from "./style.module.scss";
import classNames from 'classnames';

function TooltipTrigger ({ children }) {
    return (
        <RadixTooltip.Trigger asChild>
            { children }
        </RadixTooltip.Trigger>
    );
}

function TooltipContent ({ children, className = "", ...props }) {
    return (
        <RadixTooltip.Content sideOffset={5} className={classNames(styles.content, className)} {...props}>
            { children }
            <RadixTooltip.Arrow className={styles.arrow}/>
        </RadixTooltip.Content>
    );
}

type TTooltip = {
    trigger: React.ReactNode;
    children: React.ReactNode;
    contentProps: RadixTooltip.TooltipContentProps;
}

export default function Tooltip ({
    trigger, children,
    contentProps
}: TTooltip) {
    return (
        
        <RadixTooltip.Root>
            <TooltipTrigger>
                { trigger }
            </TooltipTrigger>
            <RadixTooltip.Portal>
                <TooltipContent {...contentProps}>
                    { children }
                </TooltipContent>
            </RadixTooltip.Portal>
        </RadixTooltip.Root>
    );
}