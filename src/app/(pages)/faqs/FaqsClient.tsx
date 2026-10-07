'use client';
import Accordion from "@/components/Accordion";
import { FAQS, FAQ_CATEGORIES, FAQ_CATEGORIES_SELECT } from "./_config";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import { useCallback, useState } from "react";
import classNames from "classnames";
import PageCounter from "../blogs/PageCounter";

const parseFAQ = (faqs: { id: string; question: string; answer: string; }[]) => {
    return faqs.map((item) => {
        return ({
            value: item.id,
            trigger: item.question,
            content: item.answer
        });
    });
};

function getFilteredFaqs (faqs, category) {
    if (category === FAQ_CATEGORIES.ALL.id) {
        return faqs;
    }
    return faqs.filter((item) => item.category === category);
}

const FaqsClient = () => {
    const MAX_FAQS_PER_PAGE = 10;
    const [curPage, setCurPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(FAQ_CATEGORIES.ALL.id);
    const faqData = parseFAQ(getFilteredFaqs(FAQS, selectedCategory));
    const totalPages = Math.ceil(faqData.length / MAX_FAQS_PER_PAGE);

    const onSelectCategory = useCallback((category) => () => {
        setSelectedCategory(category.id);
    }, []);

    const onPageChange = useCallback((value: number) => {
        setCurPage(value - 1);
    }, []);

    return (
        <section className={styles.page}>
            <h2 className={styles.title}> Popular FAQs </h2>
            <div className={styles.subTitle}> Got Questions? We've Got Answers </div>
            <div className={styles.categories}>
                {
                    FAQ_CATEGORIES_SELECT.map((item) => {
                        return (
                            <Button
                                key={item.id}
                                className={classNames(styles.button, { [styles.selected]: selectedCategory === item.id })}
                                onClick={onSelectCategory(item)}
                            >
                                {item.label}
                            </Button>
                        );
                    })
                }
            </div>
            <Accordion
                className={styles.accordion}
                headerClassName={styles.accordionHeader}
                contentClassName={styles.accordionContent}
                data={faqData.slice(MAX_FAQS_PER_PAGE * curPage, MAX_FAQS_PER_PAGE * (curPage + 1))}
            />

            {
                totalPages > 1 &&
                    <PageCounter totalPages={totalPages} onChange={onPageChange} />
            }
        </section>
    );
};

export default FaqsClient;
