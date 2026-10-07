'use client';
import PolicyPageTitle from "../_components/PageTitle";
import PolicyView from "../_components/PolicyView";
import { TERMS_INTRO, TERMS_SECTIONS } from "./_config";
import styles from "./style.module.scss";

const TermsConditionsPage = () => {
    return (
        <section className={styles.page}>
            <PolicyPageTitle title={"Terms & Conditions"} effectiveDate={"15-5-2023"} />
            <PolicyView intro={TERMS_INTRO} policy={TERMS_SECTIONS} />
        </section>
    );
};

export default TermsConditionsPage;
