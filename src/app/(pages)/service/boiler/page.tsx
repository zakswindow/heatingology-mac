import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
    title: "New Boiler Installation | Fixed Price from £1,500",
    description: "Professional boiler installation by Gas Safe vetted engineers. Fixed upfront prices, top brands (Worcester, Vaillant, Baxi, Ideal), 12-month warranty. Free online quote.",
    openGraph: { title: "New Boiler Installation | Fixed Price from £1,500 | Heatingology", description: "Professional boiler installation by Gas Safe vetted engineers. Fixed upfront prices, top brands (Worcester, Vaillant, Baxi, Ideal), 12-month warranty. Free online quote." },
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

// Import text
import { boilerReviews } from "@/assets/constants/reviews";
import Faqs from "@/components/Section/Faqs";
import bannerText from "./texts/banner";
import brands from './texts/brands';
import steps from "./texts/steps.json";
import whatMakesUsDifferent from "./texts/whatMakesUsDifferent.json";
import CardList from "../_components/CardList";
import { FAQS_BOILER } from "@/lib/data/_boiler.faqs";
import HowItWorks from "@/components/Section/HowItWorks";
import { HOW_IT_WORKS } from "./config";

export default async function BoilerService() {

    const sectionInfo = {
        title: "Explore Our Boilers",
        subHeading: "Find the right boiler for your home, and we’ll guide you along the way."
    };

    const boilers = await prisma.product.findMany({ where: { productType: ProductType.boiler } });

    const boilersList = boilers.map((boiler) => (
        <BoilerCard key={boiler.id} item={boiler}></BoilerCard>
    ));

    const leftPanelList = whatMakesUsDifferent.leftPanel;

    const rightPanelItems = whatMakesUsDifferent.rightPanel;

    const brandSection = brands.heading;

    const brandList = brands.brands;

    const brandCards = brandList.map((brandItem) => (
        <BrandCard key={brandItem.brand} item={brandItem}></BrandCard>
    ));

    const StepSection = steps.heading;

    const stepList = steps.steps;

    const stepCards = stepList.map((stepItem, index) => (
        <StepCard key={`step-${index}`} index={index + 1} item={stepItem} ></StepCard>
    ));

    const reviewSection = { title: "Don’t Just Take Our Word for It" };

    const reviewCards = boilerReviews.map((reviewItem) => (
        <ReviewCard key={reviewItem.src} data={reviewItem as ReviewCardData}></ReviewCard>
    ));

    return (
        <section className={style.boilerContainer}>
            <Hero bannerType="boiler" />
            <CardList items={boilersList} sectionName={sectionInfo} cols={3} maxItems={3} />
            <SplitPanelList leftPanelText={leftPanelList} rightPanelList={rightPanelItems}></SplitPanelList>
            <CardList className={style.brandContainer} sectionName={brandSection} items={brandCards} cols={4} maxItems={4} gap="32px" />
            {/* <CardScrollableContainer sectionName={StepSection} items={stepCards} maxItems={5} showSeeMore={false}></CardScrollableContainer> */}
            <HowItWorks data={HOW_IT_WORKS} title={"How We Look After You"} />
            <Faqs faqs={FAQS_BOILER} />
            <CardScrollableContainer className={style.reviews} sectionName={reviewSection} items={reviewCards} maxItems={reviewCards.length} showSeeMore={false} keepHorizontal={true} showScrollButtons={true}></CardScrollableContainer>
            <Banner
                title={bannerText.title}
                bannerImage={bannerText.bannerImage}
                features={bannerText.features}
                buttonText={bannerText.buttonText}
                buttonUrl={bannerText.buttonUrl}
                bannerPosition={'top'} />
        </section>
    );
}