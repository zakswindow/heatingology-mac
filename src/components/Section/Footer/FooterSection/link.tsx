import Link from "next/link";
import { LINK_TYPE, TFooterSectionPage } from "../_config";

type TFooterLink = { item: TFooterSectionPage; }

export default function FooterLink ({ item }: TFooterLink) {
    const { type = LINK_TYPE.INTERNAL } = item;

    if (type === LINK_TYPE.INTERNAL) {
        return (
            <Link
                href={item.link}>{ item.title }</Link>
        );
    }
    return (
        <a
            href={item.link} target="_blank"> { item.title } </a>
    );
}