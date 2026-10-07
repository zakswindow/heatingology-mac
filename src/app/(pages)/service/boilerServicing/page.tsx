import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
    title: "Annual Boiler Service from £125 | Gas Safe Engineers",
    description: "Keep your boiler running safely and efficiently. Annual boiler servicing from £125 by Gas Safe vetted engineers. AI-powered diagnostics and 12-month aftercare support.",
    openGraph: { title: "Annual Boiler Service from £125 | Gas Safe Engineers | Heatingology", description: "Keep your boiler running safely and efficiently. Annual boiler servicing from £125 by Gas Safe vetted engineers. AI-powered diagnostics and 12-month aftercare support." },
};
import InfoCard from "@/components/Card/InfoCard";
import ReviewCard, { ReviewCardData } from "@/components/Card/ReviewCard";
import CardScrollableContainer from "@/components/CardScrollableContainer";
import Hero from "@/components/Hero";
import SplitPanelList from "@/components/SplitPanelList";
import ServiceIncluded from "./ServiceIncluded";
import style from "./style.module.scss";

import Faqs from "@/components/Section/Faqs";
import bannerText from "./texts/banner";
import reviews from "./texts/reviews.json";
import serviceIncluded from "./texts/serviceIncluded";
import serviceInfo from "./texts/serviceInfo.json";
import whyHeatingology from "./texts/whyHeatingology.json";
import { boilerReviews } from "@/assets/constants/reviews";
import { FAQS_BOILER_SERVICE } from "@/lib/data/_boilerService.faqs";
import Articles from "@/components/Articles";
import styles from './style.module.scss';
import HomeReviews from "@/components/Reviews";

export default function BoilerServingService() {

    const infoCards = serviceInfo.infoItems.map((item) => {
        return (
            <InfoCard key={item.title} data={item}></InfoCard>
        );
    });

    const reviewCards = boilerReviews.map((reviewItem) => (
        <ReviewCard key={reviewItem.src} data={reviewItem as ReviewCardData}></ReviewCard>
    ));

    return (
        <>
            <Hero bannerType="boilerServicing" />
            <Articles className={styles.servicingInfo} items={infoCards} sectionName={serviceInfo.heading} ctaText="Book your annual service" />
            <SplitPanelList leftPanelText={whyHeatingology.leftPanel} rightPanelList={whyHeatingology.rightPanel}></SplitPanelList>
            <ServiceIncluded
                title={serviceIncluded.title}
                description={serviceIncluded.description}
                pricing={serviceIncluded.pricing}
                serviceInfo={serviceIncluded.serviceInfo}
                serviceIncludedSubtext={serviceIncluded.serviceIncludedSubtext}
            />
            <Faqs faqs={FAQS_BOILER_SERVICE} />
            <HomeReviews title={`Trusted by our happy customers`} />
            <Banner
                title={bannerText.title}
                bannerImage={bannerText.bannerImage}
                features={bannerText.features}
                buttonText={bannerText.buttonText}
                buttonUrl={bannerText.buttonUrl}></Banner>
        </>
    );
}