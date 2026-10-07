import Dialog from "@/components/Dialog";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import { EXPLANATION_CONTENT } from "./_helper";
import classNames from "classnames";
import FuelTypeList from "./FuelTypeList";
import MainGasExplainer from "./MainGasExplainer";

export default function Explanation ({ explanation }: { explanation: { label: string; content: string } }) {
    const { content } = explanation;

    return (
        <Dialog
            contentClassName={classNames(styles.explanation, styles.dialog)}
            title={<div className={styles.spacer} />}
            trigger={
                <div className={styles.container}>
                    <Icon icon={ICONS.INFO} />
                    { explanation.label }
                </div>
            }
        >
            {
                content === EXPLANATION_CONTENT.FUEL_TYPE_LIST &&
                    <FuelTypeList />
            }
            {
                content === EXPLANATION_CONTENT.MAIN_GAS &&
                    <MainGasExplainer />
            }
        </Dialog>
    );
}