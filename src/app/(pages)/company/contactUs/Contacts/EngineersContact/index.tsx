import Tel from "@/components/Anchor/Tel";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function EngineersContact () {
    return (
        <div className={styles.container}>
            <Link href="/engineerSignup">
                <Button variant="outline" className={styles.button}>
                    {`Register your interest`}
                    <Icon icon={ICONS.REQUEST_ESURVEY} />
                </Button>
            </Link>
        </div>
    )
}