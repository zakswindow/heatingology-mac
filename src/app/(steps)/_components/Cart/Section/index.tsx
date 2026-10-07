import BookingDetailsProductCard from "../ProductCard";
import styles from "./style.module.scss";
import BookingDetailsDateCard from "../DateCard";
import BookingDetailsPriceCard from "../PriceCard";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function CartSection ({ data, onChangeClick = () => {} }) {
    return (
        <section aria-label={ data.headline } className={styles.section}>
            {
                data.headline &&
                    <header className={styles.header}>
                        <div className={styles.label}>{ data.headline }</div>
                        {
                            !data.noChange &&
                                <Button className={styles.button} onClick={onChangeClick}>
                                    Change
                                    <Icon icon={ICONS.CHANGE} />
                                </Button>

                        }
                    </header>
            }
            {
                data.content.map((item, index) => {
                    if (data.type === "product") {
                        return <BookingDetailsProductCard key={item.model} product={item} />;
                    } else if (data.type === "date") {
                        return <BookingDetailsDateCard key={`${data.type}-${index}`} content={item} />;
                    } else if (data.type === "price") {
                        return <BookingDetailsPriceCard key={`${data.type}-${index}`} content={item} />;
                    }
                })
            }
        </section>
    );
}