import classNames from "classnames";
import { TQuestion } from "../_types";
import QuestionnaireImage from "../ImageIcon";
import styles from "./style.module.scss";
import HelpText from "./HelpText";
import Explanation from "./Explanation";

export default function Question ({ question }: { question: TQuestion }) {
    return (
        <div className={classNames({ [styles.hasIcon]: Boolean(question.icon) }, styles.container)}>
            {
                question.icon &&
                    <QuestionnaireImage image={question.icon} className={styles.icon} />
            }
            {
                question.label &&
                    <p className={styles.label}>{question.label}</p>
            }
            {
                question.content &&
                    <h2 className={ classNames(styles.question)}> { question.content }</h2>
            }
            {
                question.help && question.help.map((item) => {
                    return (<p key={item} className={styles.description}> { item }</p>);
                })
            }
            {
                question.explanation && <Explanation explanation={question.explanation} />
            }
        </div>
    );
}