import PolicyPageTitle from "../_components/PageTitle";
import PolicyView from "../_components/PolicyView";
import { TERMS_INTRO, TERMS_SECTIONS } from "./_config";
import styles from "./style.module.scss";

export default function TermsConditions() {
    return (
        <section className={styles.page}>
            <PolicyPageTitle title={"Terms & Conditions"} effectiveDate={"15-11-2025"} />
            <PolicyView intro={TERMS_INTRO} policy={TERMS_SECTIONS} />
        </section>
    );
}
