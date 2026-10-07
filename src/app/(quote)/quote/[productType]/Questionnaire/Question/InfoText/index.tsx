import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";
import QuestionnaireImage from "../../ImageIcon";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";
import styles from "./style.module.scss";

export default function InfoText ({ question }: { question: { info: { title?: string; content: string; phone?: string; image?: QUESTIONNAIRE_IMAGES; mobileOnly?: boolean } } }) {
    const { title, content, phone, image, mobileOnly } = question.info;
    return (
        <div className={classNames(styles.infoContainer, { [styles.mobileOnly]: mobileOnly })}>
            <Icon icon={ICONS.INFO_BRAND} className={styles.infoIcon} />
            <div className={styles.infoBody}>
                {title && <p className={styles.title}>{title}</p>}
                {image && <QuestionnaireImage image={image} className={styles.image} />}
                <p className={styles.infoContent}>
                    {content}
                    {phone && (
                        <> <a href={`tel:${phone}`} className={styles.phone}>0333 577 0017</a></>
                    )}
                </p>
            </div>
        </div>
    );
}
