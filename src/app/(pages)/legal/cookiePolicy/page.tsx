import PolicyPageTitle from "../_components/PageTitle";
import PolicyView from "../_components/PolicyView";
import { COOKIES_INTRO, COOKIES_SECTIONS } from "./_config";
import styles from "./style.module.scss";

export default function CookiesPolicy() {
    return (
        <section className={styles.page}>
            <PolicyPageTitle title={"Cookie Policy"} effectiveDate={"15-11-2025"} />
            <PolicyView intro={COOKIES_INTRO} policy={COOKIES_SECTIONS} />
        </section>
    );
}
