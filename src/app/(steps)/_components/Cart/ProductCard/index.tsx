import Image from "@/components/Image";
import styles from "./style.module.scss";
import { Product, ProductType } from "@prisma/client";
import QuestionnaireImage from "@/app/(quote)/quote/[productType]/Questionnaire/ImageIcon";
import { QUESTIONNAIRE_IMAGES_DB_ENUM } from "@/app/(quote)/quote/[productType]/Questionnaire/ImageIcon/enum";

type TBookingDetailsProductCard = { product: Product; }

export default function BookingDetailsProductCard ({ product }: TBookingDetailsProductCard) {
    const { productImage, model, warranty } = product;

    return (
        <article className={styles.card}>
            <figure className={styles.image}>
                {
                    productImage && (
                        product.productType === ProductType.boiler_extra ?
                            <QuestionnaireImage image={productImage as QUESTIONNAIRE_IMAGES_DB_ENUM} alt={model} width={24} height={24} />
                            : <Image type="product" src={productImage} alt={model} />)
                }
            </figure>
            <span className={styles.details}>
                <h5 className={styles.headline}> { model } </h5>
                {
                    warranty && 
                        <p className={styles.description}> {`${warranty} warranty`} </p>
                }
            </span>
        </article>
    );
}