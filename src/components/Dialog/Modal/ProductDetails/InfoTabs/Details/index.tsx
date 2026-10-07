import SpecsList from "@/components/Texts/SepcsList";
import styles from "./style.module.scss";
import Tags from "./Tags";
import Icon, { ICONS } from "@/components/Image/Icons";
import { HtmlTag } from "@prisma/client";

export default function Details ({ descriptions, specs, dimensions }) {
    return (
        <>
            <article className={styles.details}>
                {
                    descriptions && descriptions.map((item) => {
                        if (item.tag === HtmlTag.PARAGRAPH) {
                            return <p key={item.content}> { item.content }</p>;
                        } else if (item.tag === HtmlTag.LIST) {
                            return <li key={item.content}>
                                <Icon icon={ICONS.CHECK_MARK_FILLED} />
                                { item.content }
                            </li>;
                        } else if (item.tag === HtmlTag) {
                            return <h3 key={item.content}> { item.content }</h3>;
                        }
                    })
                }
            </article>
            {
                specs && specs.length > 0 &&
                    <article className={styles.specs}>
                        <dt>Specs</dt>
                        <SpecsList className={styles.specsList} specs={specs} keyPrefix={'tbc'} />
                    </article>
            }
            {
                dimensions && Object.keys(dimensions).length > 0 &&
                <article className={styles.dimension}>
                    <dt> Dimensions </dt>
                    <dd>
                        <Icon icon={ICONS.RULER} />
                        {`${dimensions.width}mm x ${dimensions.height}mm x ${dimensions.depth}mm`}
                    </dd>
                    <Tags />
                </article>
            }
        </>
    );
}