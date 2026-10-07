import { ProductType } from "@prisma/client";

export const evIncluded: {
    model: string;
    productType: ProductType;
}[] = [
    {
        model: "Mounting your EV charger on a suitable permanent surface such as a brick or plaster wall",
        productType: ProductType.ev_included
    },{
        model: "Drilling a cable entry hole of up to 500mm (20 inches), if required",
        productType: ProductType.ev_included
    },{
        model: "Up to 5 metres of cabling, securely clipped to the wall (up to 1.8m in height) between your consumer unit and the charger",
        productType: ProductType.ev_included
    },{
        model: "All electrical connections at both the charger and the power supply",
        productType: ProductType.ev_included
    },{
        model: "Installation of a Type A RCD/RCBO in your consumer unit or an external enclosure",
        productType: ProductType.ev_included
    },{
        model: "Up to 3 metres of conduit or trunking to neatly conceal internal wiring",
        productType: ProductType.ev_included
    },{
        model: "Full electrical testing and provision of NICEIC certification",
        productType: ProductType.ev_included
    },{
        model: "A walkthrough demonstration of the charger and its mobile app features",
        productType: ProductType.ev_included
    }
];