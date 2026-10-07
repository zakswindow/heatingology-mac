import type { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
    title: "Contact Heatingology | Get In Touch With Our Heating Team",
    description: "Get in touch with Heatingology's heating experts. Email, book a visit, or ask a question. Fast response, friendly support for boiler repairs, installation, and servicing.",
    openGraph: { title: "Contact Heatingology | Get In Touch With Our Heating Team", description: "Get in touch with Heatingology's heating experts. Email, book a visit, or ask a question. Fast response, friendly support for boiler repairs, installation, and servicing." },
};
import Callbacks from "./Callbacks";
import Contacts from "./Contacts";
import Partnership from "./Partnership";

const ContactUsPage = () => {
    return (
        <main className={styles.page}>
            <h1 className={styles.title}> Contact Us </h1>
            <p className={styles.subTitle}>Got questions or need support? Our central team is just a message away.</p>
            <Callbacks />
            <Contacts />
            <Partnership className={styles.partnership} />
        </main>
    );
};

export default ContactUsPage;