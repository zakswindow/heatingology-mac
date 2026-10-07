import styles from "./style.module.scss";
import Accordion from "@/components/Accordion";
import Link from "next/link";
import Button from "@/components/Button";
import classNames from "classnames";

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


type TFaqs = {
    faqs: TFaq[];
    className?: string;
    showViewAll?: boolean;
    showTitle?: boolean;
    label?: string;
    subtitle?: string;
}

export default function Faqs ({ label="Popular FAQs",
    subtitle=`Got Questions? We've Got Answers`,
    faqs, className, showViewAll = true, showTitle = true }: TFaqs) {
    const faqsData = parseFaq(faqs);

    return (
        <section aria-label="faqs" className={classNames(className, styles.section)}>
            <main className={styles.content}>
                {
                    showTitle &&
                        <div className={styles.header}>
                            <h2> {label} </h2>
                            <p> { subtitle } </p>
                        </div>
                }
                <Accordion
                    data={faqsData}
                    className={styles.faqs}
                    contentClassName={styles.content}
                    headerClassName={styles.header}
                />
            </main>
            {
                showViewAll &&
                    <Link href="/faqs" className={styles.footer}>
                        <Button variant="outline"> View all</Button>            
                    </Link>
            }
        </section>
    );
}