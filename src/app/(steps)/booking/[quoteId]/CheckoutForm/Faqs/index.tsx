import { FAQS } from "@/app/(pages)/faqs/_config";
import Accordion from "@/components/Accordion";
import styles from "./style.module.scss";

export type TFaq = { question: string; answer: string; }

function parseFaq (faqs: TFaq[]) {
    return faqs.map((item, index) => {
        return ({
            value: `item-${index}`,
            trigger: item.question,
            content: item.answer
        });
    });
};

export default function PaymentFaqs () {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}> {`Help & info`} </h2>
            <Accordion
                contentClassName={styles.accordionContent}
                data={parseFaq(FAQS.slice(0, 5))}
            />
        </section>
    )
}