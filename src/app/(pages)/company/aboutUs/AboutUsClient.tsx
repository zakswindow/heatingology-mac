'use client';
import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import Partnership from "./../contactUs/Partnership";
import Achievements from "./achievements";
import Info from "./intro";
import People from "./people";
import Values from "./values";

import achivementsText from "./texts/achievements.json";
import bannerText from "./texts/banner";
import infoText from './texts/info.json';
import peopleText from "./texts/people.json";
import valuesText from "./texts/values.json";

import style from "./style.module.scss";

const AboutUsClient = () => {
    return (
        <section className="AboutUs">
            <Hero bannerType="aboutUs" className={style.hero} />
            <Info className={style.info} title={infoText.title} description={infoText.description} video_url={infoText.video_url} />
            <Achievements className={style.achievements} title={achivementsText.title} description={achivementsText.description} image_url={achivementsText.image_url} achievements={achivementsText.achievements} />
            <Partnership className={style.partnership} />
            <Values className={style.values} title={valuesText.title} description={valuesText.description} items={valuesText.values} />
            <People className={style.people} title={peopleText.title} description={peopleText.description} members={peopleText.people} />
            <Banner
                title={bannerText.title}
                bannerImage={bannerText.bannerImage}
                features={bannerText.features}
                buttonText={bannerText.buttonText}
                buttonUrl={bannerText.buttonUrl}></Banner>
        </section>
    );
};

export default AboutUsClient;
