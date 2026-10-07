import { Metadata } from "next";
import PolicyPageTitle from "../_components/PageTitle";
import HeatAssureTermsView from "./_components/HeatAssureTermsView";
import { HEATASSURE_INTRO, HEATASSURE_SECTIONS } from "./_config";
import styles from "./style.module.scss";

export const metadata: Metadata = {
    title: "HeatAssure™ Terms & Conditions | Heatingology",
    description: "Read the HeatAssure™ subscription plan terms and conditions from Heatingology Ltd.",
    robots: { index: true, follow: true },
};

export default function HeatAssureTermsPage() {
    return (
        <section className={styles.page}>
            <PolicyPageTitle title="HeatAssure™ Terms & Conditions" effectiveDate="17-05-2025" />
            <HeatAssureTermsView intro={HEATASSURE_INTRO} sections={HEATASSURE_SECTIONS} />
        </section>
    );
}
