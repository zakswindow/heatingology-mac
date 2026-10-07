import Button from "@/components/Button";
import { ANSWER_TYPES, TQuestion } from "../_types";
import styles from './style.module.scss';
import Link from "next/link";
import { ProductType } from "@prisma/client";
import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";

type TFooter = {
    curQuestion: TQuestion;
    productType: ProductType;
    buttons: {
        label: string;
        action: () => void;
        disabled?: boolean;
    }[];
}

function FooterButton ({ data }) {

    if (data.label === "Back") {
        return (
            <Button
                className={styles.iconButton}
                variant="outline"
                onClick={data.action}>
                <Icon icon={ICONS.ARROW_LEFT} />
            </Button>
        );
    }

    if (data.label === "Restart") {
        return (
            <Button
                className={styles.restart}
                variant="transparent"
                onClick={data.action}>
                { data.label }
                <Icon icon={ICONS.RESTART} />
            </Button>
        );
    }

    return (
        <Button
            className={styles.bottomButton}
            onClick={data.action}
            disabled={data.disabled}
        >
            { data.label }
            { data.label === "Next" && <Icon icon={ICONS.ARROW_RIGHT} /> }
        </Button>
    );
}


export default function Footer ({ productType, curQuestion, buttons }: TFooter) {
    const isPostcode = curQuestion.type === ANSWER_TYPES.POSTCODE;
    return (
        <div className={classNames(styles.footer, { [styles.postcodeFooter]: isPostcode })}>
            {
                buttons.map((item) => {
                    if (item.label === "Restart") {
                        return (
                            <Link key={item.label} href={`/quote/${productType}`} >
                                <FooterButton data={item} />
                            </Link>
                        );
                    }
                    return (
                        <FooterButton key={item.label} data={item} />
                    );
                })
            }
        </div>
    );
}