import { HtmlTag, ProductType } from "@prisma/client";

export const evChargers = [{
    brand: "Hypervolt",
    model: "Hypervolt Home 3 Pro (Space Grey)",
    warranty: "3 years",
    specs: [`Up to 5 Years Warranty`, `Water and dust proof`, `Safely lock when you're away`],
    price: 1530,
    description: [{
        tag: HtmlTag.HEADER,
        content: `Charge Smarter, Live Better – Hypervolt Home 3 Pro in Space Grey`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Bring luxury and convenience to your driveway with the Hypervolt Home 3 Pro in Space Grey. Sleek, modern, and beautifully designed, it transforms everyday charging into a seamless part of your lifestyle. Whether you're heading out for the school run or planning a weekend getaway, your EV is always ready when you are.`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Control everything from the Hypervolt App, set schedules, track costs, or check your charging status from anywhere. Built tough for British weather yet stylish enough to complement any home, the Home 3 Pro blends effortlessly into your space while giving you smart, hassle-free charging day after day.`
    }, {
        tag: HtmlTag.HEADER,
        content: `Perfect for families, commuters, and anyone who wants a stylish upgrade to their home charging experience.`
    }],
    productType: ProductType.ev_charger,
    productImage: "/products/evCharger/spaceGrey/SpaceGrey_Front.png",
    productImages: [
        "/products/evCharger/spaceGrey/SpaceGrey_Front.png",
        "/products/evCharger/spaceGrey/SpaceGrey_LEDGreen.png",
        "/products/evCharger/spaceGrey/SpaceGrey_Top.png",
        "/products/evCharger/spaceGrey/SpaceGrey_Side.png",
        "/products/evCharger/spaceGrey/SpaceGrey_Angle.png",
        "/products/evCharger/spaceGrey/SpaceGrey_Lifestyle.png"
    ],
    hasVat: true,
    dimensions: {
        width: 243,
        height: 328,
        depth: 101 
    },
    note: `A sleek, modern charger in Space Grey, combining smart technology with powerful, efficient home charging.`
}, {
    brand: "Hypervolt",
    model: "Hypervolt Home 3 Pro (Ultra Black)",
    warranty: "3 years",
    specs: [`Up to 5 Years Warranty`, `Unlock the UK's cheapest tariffs`, `95% UV durability`],
    price: 1530,
    description: [{
        tag: HtmlTag.HEADER,
        content: `Charge Smarter, Live Better – Hypervolt Home 3 Pro in Ultra Black`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Bring luxury and convenience to your driveway with the Hypervolt Home 3 Pro in Ultra Black. Sleek, modern, and beautifully designed, it transforms everyday charging into a seamless part of your lifestyle. Whether you're heading out for the school run or planning a weekend getaway, your EV is always ready when you are.`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Control everything from the Hypervolt App, set schedules, track costs, or check your charging status from anywhere. Built tough for British weather yet stylish enough to complement any home, the Home 3 Pro blends effortlessly into your space while giving you smart, hassle-free charging day after day.`
    }, {
        tag: HtmlTag.HEADER,
        content: `Perfect for families, commuters, and anyone who wants a stylish upgrade to their home charging experience.`
    }],
    productType: ProductType.ev_charger,
    productImage: "/products/evCharger/ultraBlack/UltraBlack_Front.png",
    productImages: [
        "/products/evCharger/ultraBlack/UltraBlack_Front.png",
        "/products/evCharger/ultraBlack/UltraBlack_LEDGreen.png",
        "/products/evCharger/ultraBlack/UltraBlack_Top.png",
        "/products/evCharger/ultraBlack/UltraBlack_Side.png",
        "/products/evCharger/ultraBlack/UltraBlack_Angle.png",
        "/products/evCharger/ultraBlack/UltraBlack_Lifestyle.png"
    ],
    hasVat: true,
    dimensions: {
        width: 243,
        height: 328,
        depth: 101 
    },
    note: `A bold, premium black finish with advanced smart features for seamless, intelligent home charging.`
}, {
    brand: "Hypervolt",
    model: "Hypervolt Home 3 Pro (Ultra White)",
    warranty: "3 years",
    specs: [`Playful LED Modes`, `Up to 5 Years Warranty`, `Tough weather proof`],
    price: 1530,
    description: [{
        tag: HtmlTag.HEADER,
        content: `Charge Smarter, Live Better – Hypervolt Home 3 Pro in Ultra White`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Bring luxury and convenience to your driveway with the Hypervolt Home 3 Pro in Ultra White. Sleek, modern, and beautifully designed, it transforms everyday charging into a seamless part of your lifestyle. Whether you're heading out for the school run or planning a weekend getaway, your EV is always ready when you are.`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Control everything from the Hypervolt App, set schedules, track costs, or check your charging status from anywhere. Built tough for British weather yet stylish enough to complement any home, the Home 3 Pro blends effortlessly into your space while giving you smart, hassle-free charging day after day.`
    }, {
        tag: HtmlTag.HEADER,
        content: `Perfect for families, commuters, and anyone who wants a stylish upgrade to their home charging experience.`
    }],
    productType: ProductType.ev_charger,
    productImage: "/products/evCharger/ultraWhite/UltraWhite_Front.png",
    productImages: [
        "/products/evCharger/ultraWhite/UltraWhite_Front.png",
        "/products/evCharger/ultraWhite/UltraWhite_LEDGreen.png",
        "/products/evCharger/ultraWhite/UltraWhite_Top.png",
        "/products/evCharger/ultraWhite/UltraWhite_Side.png",
        "/products/evCharger/ultraWhite/UltraWhite_Angle.png",
        "/products/evCharger/ultraWhite/UltraWhite_Lifestyle.png"
    ],
    hasVat: true,
    dimensions: {
        width: 243,
        height: 328,
        depth: 101 
    },
    note: `A clean, contemporary white design delivering reliable, smart EV charging for modern homes.`
}].map((item) => {
    return {
        ...item,
        priceWithVat: item.price
    };
});