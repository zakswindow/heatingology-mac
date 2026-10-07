import CardScrollableContainer from "@/components/CardScrollableContainer";
import { boilerReviews } from "@/assets/constants/reviews";
import ReviewCard, { ReviewCardData } from "@/components/Card/ReviewCard";
import styles from "./style.module.scss";

type THomeReviews = {
    title?: string;
}

export default function HomeReviews ({ title }: THomeReviews) {

    const reviewCards = boilerReviews.map((reviewItem) => (
        <ReviewCard key={reviewItem.src} data={reviewItem as ReviewCardData}></ReviewCard>
    ));


    return (
        <CardScrollableContainer
            className={styles.container}
            sectionName={{ title: title ?? "Proven trust. Real stories." }}
            items={reviewCards}
            maxItems={reviewCards.length}
            showSeeMore={false}
            keepHorizontal={true}
            showScrollButtons={true}
        />
    );
}
