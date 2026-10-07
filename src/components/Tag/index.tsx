import classNames from "classnames";
import styles from "./style.module.scss";

export enum TAG_TYPES {
    PRICE = "price"
};

type TTag = {
    children: React.ReactNode;
    className?: string;
    tagType?: TAG_TYPES | string;
}

function normalizeTagType (tagType: string): string {
    const shortAbbrevMatch = tagType.match(/\d+%\s*([A-Za-z]{1,3})\b/);
    if (shortAbbrevMatch) return shortAbbrevMatch[1].toLowerCase();

    return tagType
        .replace(/\d+%\s*[A-Za-z]{4,}\b/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
}

function getTagCss (tagType: string) {
    return styles[normalizeTagType(tagType)] || "";
}

export default function Tag ({ children, className, tagType = "" }: TTag) {
    console.log(tagType);
    const tagCss = classNames(getTagCss(tagType), styles.tag);
    return (
        <span
            className={classNames(className, tagCss)}
        >
            { children }
        </span>
    );
}