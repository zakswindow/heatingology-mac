import Icon, { ICONS } from "@/components/Image/Icons";
import Link from "next/link";
import { PATH_SOCIAL_FACEBOOK, PATH_SOCIAL_LINKEDIN, PATH_SOCIAL_X } from "@/lib/_pathMap";
import styles from "./style.module.scss";

const SOCIAL_LINKS = [
    { icon: ICONS.TWITTER_X, href: PATH_SOCIAL_X },
    { icon: ICONS.FACEBOOK, href: PATH_SOCIAL_FACEBOOK },
    { icon: ICONS.LINKED_IN, href: PATH_SOCIAL_LINKEDIN },
];

export default function SocialMedia () {
    return (
        <nav className={styles.nav}>
            {SOCIAL_LINKS.map(({ icon, href }) => (
                <Link key={icon} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon icon={icon} className={styles.icon} />
                </Link>
            ))}
        </nav>
    );
}