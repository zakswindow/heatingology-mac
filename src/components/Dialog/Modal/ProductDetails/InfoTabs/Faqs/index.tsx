import styles from "./style.module.scss";
import { FAQS } from "@/app/(pages)/faqs/_config";
import Faqs from "@/components/Section/Faqs";


function parseFaq (faqs) {
    return faqs.map((item, index) => {
        return ({
            value: `item-${index}`,
            trigger: item.question,
            content: item.answer
        });
    });
};

export default function ProductFaqs ({ faqs }) {
    return (
        <article className={styles.faqsContainer}>
            <dt>FAQ</dt>
            <p> Here are some of the most common questions we get. </p>
            <Faqs className={styles.faqs} faqs={faqs} showViewAll={false} showTitle={false} />
        </article>
    );
}