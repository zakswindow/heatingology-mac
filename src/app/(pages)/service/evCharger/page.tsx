import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
    title: "Home EV Charger Installation | Fixed Price",
    description: "Get a home electric vehicle charger installed by vetted engineers. Fixed upfront pricing, 12-month warranty, fast turnaround. Book your EV charger installation today.",
    openGraph: { title: "Home EV Charger Installation | Fixed Price | Heatingology", description: "Get a home electric vehicle charger installed by vetted engineers. Fixed upfront pricing, 12-month warranty, fast turnaround. Book your EV charger installation today." },
};
import BoilerCard from "@/components/Card/BoilerCard";
import BrandCard from "@/components/Card/BrandCard";
import ReviewCard, { ReviewCardData } from "@/components/Card/ReviewCard";
import StepCard from "@/components/Card/StepCard";
import CardScrollableContainer from "@/components/CardScrollableContainer";
import Hero from "@/components/Hero";
import SplitPanelList from "@/components/SplitPanelList";
import style from "./style.module.scss";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import Faqs from "@/components/Section/Faqs";
import reviews from "./texts/reviews.json";
import steps from "./texts/steps.json";
import whyHeatingology from "./texts/whyHeatingology.json";
import { boilerReviews } from "@/assets/constants/reviews";
import { FAQS_EV_CHARGER } from "@/lib/data/_evCharger.faqs";
import HowItWorks from "@/components/Section/HowItWorks";
import { HOW_IT_WORKS } from "./config";
import CardList from "../_components/CardList";
import bannerText from "./texts/banner";
import Articles from "@/components/Articles";

export default async function EvChargerService() {

    const sectionInfo = {
        title: "Choose the Right EV Charger for Your Home",
        subHeading: "Quick online quote. No obligation. No phone calls needed."
    };

    const evChargers = await prisma.product.findMany({ where: { productType: ProductType.ev_charger } });

    const evChargersList = evChargers.map((boiler) => (
        <BoilerCard key={boiler.id} item={boiler}></BoilerCard>
    ));

    const StepSection = steps.heading;

    const stepCards = steps.steps.map((stepItem, index) => (
        <StepCard key={index} index={index + 1} item={stepItem} ></StepCard>
    ));

    const reviewCards = boilerReviews.map((reviewItem) => (
        <ReviewCard key={reviewItem.src} data={reviewItem as ReviewCardData}></ReviewCard>
    ));

    return (
        <>
            <Hero bannerType="EVCharger" overlayClassName={style.heroOverlay} />
            <Articles className={style.chargers} items={evChargersList} sectionName={sectionInfo} />
            {/* <CardList className={style.chargers} items={evChargersList} sectionName={sectionInfo} cols={3} maxItems={3} /> */}
            
            <SplitPanelList className={style.evReasons} leftPanelText={whyHeatingology.leftPanel} rightPanelList={whyHeatingology.rightPanel}></SplitPanelList>
            <HowItWorks title={`Your EV Charger, Installed in 4\nSimple Steps`} data={HOW_IT_WORKS} />
            <Faqs className={style.evChargerFaq} faqs={FAQS_EV_CHARGER} />
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