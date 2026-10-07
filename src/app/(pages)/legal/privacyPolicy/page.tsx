import PolicyPageTitle from "../_components/PageTitle";
import PolicyView from "../_components/PolicyView";
import { PRIVACY_INTRO, PRIVACY_SECTIONS } from "./_config";
import styles from "./style.module.scss";

const PrivacyPolicyPage = () => {

    return (
        <section className={styles.page}>
            <PolicyPageTitle title={"Privacy Policy"} effectiveDate={"15-5-2023"} />
            <PolicyView intro={PRIVACY_INTRO} policy={PRIVACY_SECTIONS} />
        </section>
    );
};

export default PrivacyPolicyPage;