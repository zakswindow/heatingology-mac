import { HtmlTag, ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const heatPumps = [{
    brand: "Worecester",
    model: "Worcester Compress 2000 AWF 4 R-S Heat Pump",
    homeowner: true,
    landlord: true,
    warranty: "2 years",
    specs: [`2 years warranty`],
    priceWithVat: 15210,
    minBath: 1,
    maxBath: 2,
    minBed: 1,
    maxBed: 3,
    description: [{
        tag: HtmlTag.HEADER,
        content: `Clean, clever, comfortable`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Compact, efficient and hybrid compatible, the CS2000 air to water full monobloc heat pump gives you lower carbon^ heating and hot water at home, by harnessing the natural warmth of the great outdoors. When you’re keeping one eye on budget, space, and emissions, the CS2000 could be your perfect match.`
    }],
    productType: ProductType.heatPump,
    productImage: "/products/heatpump/main.png",
    note: `All Heat pump customer can apply for grant from goverment up to £7500.00`
}, {
    brand: "Worecester",
    model: "Worcester Compress 2000 AWF 8 R-S Heat Pump",
    homeowner: true,
    landlord: true,
    warranty: "2 years",
    specs: [`2 years warranty`],
    priceWithVat: 15620,
    minBath: 1,
    maxBath: 3,
    minBed: 1,
    maxBed: 3,
    description: [{
        tag: HtmlTag.HEADER,
        content: `Clean, clever, comfortable`
    }, {
        tag: HtmlTag.PARAGRAPH,
        content: `Compact, efficient and hybrid compatible, the CS2000 air to water full monobloc heat pump gives you lower carbon^ heating and hot water at home, by harnessing the natural warmth of the great outdoors. When you’re keeping one eye on budget, space, and emissions, the CS2000 could be your perfect match.`
    }],
    productType: ProductType.heatPump,
    productImage: "/products/heatpump/main.png",
    note: `All Heat pump customer can apply for grant from goverment up to £7500.00`
}]