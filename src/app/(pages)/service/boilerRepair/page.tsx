import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
    title: "Boiler Repair from £85 | Same-Day Gas Safe Engineers",
    description: "Fast boiler repairs from £85. Gas Safe engineers, 12-month warranty, no hidden fees. Same-day service in Islington, Camden, Hackney, Enfield, Havering, Bromley, Lewisham & more.",
    openGraph: { title: "Boiler Repair from £85 | Same-Day Gas Safe Engineers | Heatingology", description: "Fast boiler repairs from £85. Gas Safe engineers, 12-month warranty, no hidden fees. Same-day service in Islington, Camden, Hackney, Enfield, Havering, Bromley, Lewisham & more." },
};
import ReviewCard, { ReviewCardData } from "@/components/Card/ReviewCard";
import StepCard from "@/components/Card/StepCard";
import CardScrollableContainer from "@/components/CardScrollableContainer";
import Hero from "@/components/Hero";
import PricingComponent from "./pricingComponent";
import style from "./style.module.scss";

// Text Configs
import Faqs from "@/components/Section/Faqs";
import bannerText from "./texts/banner";
import pricingText from "./texts/pricing.json";
import reviews from "./texts/reviews.json";
import steps from "./texts/steps.json";
import { boilerReviews } from "@/assets/constants/reviews";
import { FAQS_BOILER_REPAIR } from "@/lib/data/_boilerRepair.faqs";
import HowItWorks from "@/components/Section/HowItWorks";
import { HOW_IT_WORKS } from "./config";

export default function BoilerRepairService() {
    const stepList = steps.steps;

    const reviewCards = boilerReviews.map((reviewItem) => (
        <ReviewCard key={reviewItem.src} data={reviewItem as ReviewCardData}></ReviewCard>
    ));

    return (
        <>
            <Hero bannerType="boilerRepair" />
            <HowItWorks data={HOW_IT_WORKS} title={`Your Fast, Friendly Repair Journey`} />
            <PricingComponent tableHeading={pricingText.tableTitle} title={pricingText.title} subheading={pricingText.subheading} tableData={pricingText.tableData} additionalInfo={pricingText.additionalInfo} buttonText={pricingText.buttonText} />
            <Faqs faqs={FAQS_BOILER_REPAIR} label="FAQ Hub" subtitle="Straightforward answers to the things people ask most." />
            <CardScrollableContainer className={style.reviews} sectionName={reviews.heading} items={reviewCards} maxItems={reviewCards.length} showSeeMore={false} keepHorizontal={true} showScrollButtons={true}></CardScrollableContainer>
            <Banner
                title={bannerText.title}
                bannerImage={bannerText.bannerImage}
                features={bannerText.features}
                buttonText={bannerText.buttonText}
                buttonUrl={bannerText.buttonUrl}></Banner>
        </>
    );
}