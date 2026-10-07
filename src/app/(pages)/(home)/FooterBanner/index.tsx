import { HOME_FOOTER_BANNER } from "@/lib/_imageMap";
import Banner from '@/components/Banner';
import { PATH_QUOTE_BOILER } from '@/lib/_pathMap';

export default function FooterBanner () {
    const headline = "Trusted and affordable heating care";
    const specs = [
        "Vetted Experts",
        "12-Month Warranty",
        "Interest Free"
    ];

    const banner = {
        bannerImage: HOME_FOOTER_BANNER,
        title: "Trusted and affordable heating care",
        features: [
            "Vetted Experts",
            "12-Month Warranty",
            "Interest Free"
        ],
        buttonText: "Get your fixed price",
        buttonUrl: PATH_QUOTE_BOILER
    };


    return (
        <Banner
                title={banner.title}
                bannerImage={banner.bannerImage}
                features={specs}
                buttonText={banner.buttonText}
                buttonUrl={banner.buttonUrl}
                bannerPosition={'top'} />
    );
}