"use client";
import Faqs from "./Faqs";
import Services from "./Services";
import FooterBanner from "./FooterBanner";
import Benefits from "./Benefits";
import Hero from "./Hero";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/app/loading";
import HomeReviews from "@/components/Reviews";
import { isElementInView } from "@/lib/_nav";
import LogoMarquee from "@/components/Section/Marquee/LogoMarquee";
import { HOW_IT_WORKS } from "./config";
import HowItWorks from "@/components/Section/HowItWorks";
import Blogs from "@/components/Blogs";
import HeatingologyDifference from "@/components/Section/HeatingologyDifference";

export default function HomeClient () {
    

    return (
        <section>
            <Suspense fallback={<Loading />}>
                <Hero />
                <LogoMarquee />
                <Services id="home-services" />
                <HowItWorks data={HOW_IT_WORKS} title={`How We Look After You`}/>
                <HeatingologyDifference id="home-benefits" />
                <HomeReviews />
                <Faqs />
                <Blogs title={`Stay Warm, Stay Informed`} />
                <FooterBanner />
            </Suspense>
        </section>
    );
}
