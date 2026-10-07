import type { Metadata } from "next";
import Banner from "@/components/Banner";

export const metadata: Metadata = {
    title: "Heat Pump Installation London & Essex | Professional Fitting",
    description: "Heat pump installation across Islington, Camden, Enfield, Barnet, Havering, Bromley, Thurrock & more. Qualified engineers, government grant guidance, 12-month warranty.",
    openGraph: { title: "Heat Pump Installation London & Essex | Professional Fitting | Heatingology", description: "Heat pump installation across Islington, Camden, Enfield, Barnet, Havering, Bromley, Thurrock & more. Qualified engineers, government grant guidance, 12-month warranty." },
};
import BoilerCard from "@/components/Card/BoilerCard";
import InfoCard from "@/components/Card/InfoCard";
import StepCard from "@/components/Card/StepCard";
import CardScrollableContainer from "@/components/CardScrollableContainer";
import Hero from "@/components/Hero";
import style from "./style.module.scss";

import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";

import Faqs from "@/components/Section/Faqs";
import bannerText from "./texts/banner";
import heatPumpInfo from "./texts/heatPumpInfo.json";
import heatPumpReasons from './texts/heatPumpReasons.json';
import heatPumpSteps from "./texts/steps.json";
import { FAQS_HEAT_PUMP } from "@/lib/data/_heatpump.faqs";
import HowItWorks from "@/components/Section/HowItWorks";
import { HOW_IT_WORKS } from "./config";
import Articles from "@/components/Articles";
import CardList from "../_components/CardList";

export default async function HeatPumpService() {

    const sectionInfo = {
        title: "Upgrade to Smarter Heating",
        subHeading: "Find the right Heat Pump for your home"
    };

    const heatPumps = await prisma.product.findMany({ where: { productType: ProductType.heatPump } });

    const heatPumpList = heatPumps.map((boiler) => (
        <BoilerCard key={boiler.id} item={boiler}></BoilerCard>
    ));

    const reasonCards = heatPumpReasons.infoItems.map((item) => {
        return (
            <InfoCard key={item.title} data={item}></InfoCard>
        );
    });

    const infoCards = heatPumpInfo.infoItems.map((item) => {
        return (
            <InfoCard key={item.title} data={item}></InfoCard>
        );
    });

    const stepCards = heatPumpSteps.steps.map((stepItem, index) => (
        <StepCard key={index} index={index + 1} item={stepItem} ></StepCard>
    ));
    return (
        <>
            <Hero bannerType="heatPump" />
            <CardList items={heatPumpList} className={style.heatPumpContainer} maxItems={3} cols={Math.min(heatPumpList.length, 3)} sectionName={sectionInfo} />
            {/* <CardScrollableContainer className={style.heatPumpContainer} sectionName={sectionInfo} items={heatPumpList} maxItems={3} showSeeMore={false}></CardScrollableContainer> */}
            {/* <CardScrollableContainer className={style.heatPumpReasons} sectionName={heatPumpReasons.heading} items={reasonCards} maxItems={3} showSeeMore={false}></CardScrollableContainer>
            <CardScrollableContainer className={style.heatPumpInfo} sectionName={heatPumpInfo.heading} items={infoCards} maxItems={3} showSeeMore={false}></CardScrollableContainer> */}
            <HowItWorks title={heatPumpSteps.heading.title} data={HOW_IT_WORKS} />
            <Faqs faqs={FAQS_HEAT_PUMP} />
            <Banner
                title={bannerText.title}
                bannerImage={bannerText.bannerImage}
                features={bannerText.features}
                buttonText={bannerText.buttonText}
                buttonUrl={bannerText.buttonUrl}></Banner>
        </>
    );
}