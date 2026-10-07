import { HtmlTag, ProductType } from "@prisma/client";

export const boilerIncluded: {
    model: string;
    productType: ProductType;
    description?: {
        tag: HtmlTag;
        content: string;
    }[]
}[] = [
    {
        model: "Boiler and flue installation",
        productType: ProductType.boiler_included
    },
    {
        model: "Megna Clean",
        productType: ProductType.boiler_included,
        description: [{
            tag: HtmlTag.HEADER,
            content: "What is a filter?"
        }, {
            tag: HtmlTag.PARAGRAPH,
            content: "A magnetic filter, included with most boiler installations, is fitted on the return flow to capture system debris and protect your new boiler."
        }]
    },
    {
        model: "For Main and Baxi boilers, we use Adey MagnaClean with MC1 and MC3 chemicals",
        productType: ProductType.boiler_included
    },
    {
        model: "Wireless room thermostat",
        productType: ProductType.boiler_included,
        description: [{
            tag: HtmlTag.HEADER,
            content: "What is a Room Thermostat?"
        }, {
            tag: HtmlTag.PARAGRAPH,
            content: `A wireless room thermostat controls your heating and includes a portable or remote unit for adjusting the temperature from anywhere in your home.`
        }]
    },
    {
        model: "Includes Condesation pipe",
        productType: ProductType.boiler_included,
        description: [{
            tag: HtmlTag.HEADER,
            content: `What is condensate pipes and fittings?`
        }, {
            tag: HtmlTag.PARAGRAPH,
            content: `Condensate pipes and fittings are components of a heating system that safely carry acidic wastewater produced by condensing boilers.`
        }]
    },
    {
        model: "Secondary tightness test on the gas installation",
        productType: ProductType.boiler_included
    },
    {
        model: "Boiler fitting pack supplied",
        productType: ProductType.boiler_included,
        description: [{
            tag: HtmlTag.HEADER,
            content: "What is a boileer fitting pack?"
        }, {
            tag: HtmlTag.PARAGRAPH,
            content: `Also known as a boiler installation kit, is a collection of components and accessories needed to install a new boiler.`
        }]
    },
    {
        model: "Installation of condensate pipe and fittings",
        productType: ProductType.boiler_included
    },
    {
        model: "Building Regulations Certificate",
        productType: ProductType.boiler_included
    },
    {
        model: "Gas safety certificate",
        productType: ProductType.boiler_included
    },
    {
        model: "Manufacture warranty",
        productType: ProductType.boiler_included
    },
    {
        model: "All labour included",
        productType: ProductType.boiler_included
    },
    {
        model: "Removal and disposal of the old boiler",
        productType: ProductType.boiler_included
    },
    {
        model: "Removal and disposal of all old fittings and pipework",
        productType: ProductType.boiler_included
    },
    {
        model: "Including all Required electrical work",
        productType: ProductType.boiler_included
    },
    {
        model: "Installation of fused spur",
        productType: ProductType.boiler_included
    },
    {
        model: "Removal of asbestos (if discovered during installation)",
        productType: ProductType.boiler_not_included
    },
    {
        model: "Scaffolding",
        productType: ProductType.boiler_not_included
    },
    {
        model: "Specialist access equipment",
        productType: ProductType.boiler_not_included
    },
    {
        model: "planing permission",
        productType: ProductType.boiler_not_included
    },
    {
        model: "System chemical flush available at an additional cost",
        productType: ProductType.boiler_not_included
    },
    {
        model: "Change of installation location will incur additional charges",
        productType: ProductType.boiler_not_included
    },
    {
        model: "Roof Flu not included",
        productType: ProductType.boiler_not_included
    }
];