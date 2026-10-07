import Tooltip from "@/components/Tooltip";
import { forwardRef } from "react";
import styles from "./style.module.scss";
import { HtmlTag } from "@prisma/client";

const Card = forwardRef<HTMLDivElement, any>(({ product, ...props }, ref) => {
    const description = product.description?.filter((item) => {
        return item.tag === HtmlTag.PARAGRAPH;
    }).map((item) => {
        return item.content;
    });


    return (
        <article
            className={styles.card}
            ref={ref}
            {...props}
        >
            <div className={styles.headline}> { product.model } </div>
            <div className={styles.description}> 
                {
                    description && description.length > 0 && description.map((item) => {
                        return <p key={item}> { item }</p>;
                    })
                }
            </div>
        </article>
    );
});

Card.displayName = "Card";

export default function WhatsIncludedCard ({ product }) {
    return <Tooltip
        trigger={<Card product={product} />}
        contentProps={{
            side: "bottom",
            align: "end"
        }}
    >
        <h1 style={{ background: "red" }}> Hello world </h1>
    </Tooltip>;
}