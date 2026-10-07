import Accordion from "@/components/Accordion";
import styles from "./style.module.scss";
import DepositSlider from "../DepositSlider";
import DescriptionRow from "@/components/Texts/DescriptionRow";
import { useEffect, useState } from "react";
import { calculateMonthlyRepayments } from "@kanda-libs/kanda-utils";

export default function OptionAccordion ({ payment, loan }) {
    const [deposit, setDeposit] = useState("0");
    const [monthly, setMonthly] = useState(payment.repayment);

    useEffect(() => {
        const repayment = calculateMonthlyRepayments(loan - parseInt(deposit), payment);
        setMonthly(repayment);
    }, [deposit, loan, payment]);
 

    return (
        <Accordion
            openDefault={false}
            className={styles.accordion}
            headerClassName={styles.accordionHeader}
            itemClassName={styles.accordionItem}
            data={[{
                value: payment.name,
                trigger: (
                    <label className={styles.triggerLabel}>
                        {`£${monthly} for ${payment.duration} months`}
                    </label>
                ),
                content: (
                    <section className={styles.content}>
                        <DepositSlider total={loan} onChange={(value) => setDeposit(value)}/>
                        <DescriptionRow className={styles.descriptionRow} label={"Monthly payment:"} value={`£${monthly}`} />
                        <DescriptionRow className={styles.descriptionRow} label={"Deposit:"} value={`£${deposit}`} />
                        <DescriptionRow className={styles.descriptionRow} label={"Payment term:"} value={`${payment.duration} months`} />
                        <DescriptionRow className={styles.descriptionRow} label={"APR Representative:"} value={`${payment.apr / 100}% APR`} />
                        <DescriptionRow className={styles.descriptionRow} label={"Loan amount:"} value={`£${loan - parseInt(deposit)}`} />
                        <DescriptionRow className={styles.descriptionRow} label={"Total payable:"} value={`£${monthly * payment.duration}`} />
                    </section>
                )
            }]}
        />
    );

}