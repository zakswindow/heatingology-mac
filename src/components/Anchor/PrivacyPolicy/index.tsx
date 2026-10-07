import classNames from "classnames";
import Link from "next/link";
import styles from "./style.module.scss";

export default function PrivacyPolicy ({ className = ""}) {
    return (
        <Link href={"/legal/privacyPolicy"} className={classNames(className, styles.link)}>
            {`privacy policy.`}
        </Link>
    );
}