import { ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const boilerAddOns = [{
    model: "Lime Scale removal",
    specs: [
        "Whole-house limescale protection",
        "Robust all-metal construction with a durable chrome-plated finish",
        "Complies with Part L Building Regulations",
        "Maximum working pressure: 12 bar",
        "Maximum operating temperature: 80°C",
        "Maximum flow rate: 1.08 l/sec (14 gpm)",
        "WRAS approved",
        "Lifetime guarantee"
    ],
    price: 45,
    productType: ProductType.boiler_add_ons,
    productImage: "/products/boiler_add_ons/lime_scale_reducer/1.png",
    included: [`Parts and labour`],
    excluded: [],
    descriptionMarkdown: `
        Suitable for use on cold-water lines, this unit helps prevent the formation of limescale build-up.

        It provides whole-house protection against soft limescale, requires no maintenance, and does not need earth bonding. The unit can be installed vertically or horizontally and is compatible with compression pipework. No chemicals or additives are required.
    `
}, {
    model: "ESI Thermostat",
    specs: [
        "Controller Type: Push-button and wireless app control",
        "Special Features: Holiday mode, OpenTherm communication",
        "Suitable For: Boilers",
        "Temperature Control: Programmable",
        "Connectivity: RF",
        "Power Source: Battery",
        "Display Type: Digital",
        "Control Method: Remote operation",
        "Mounting Options: Wall-mounted or floor-mounted"
    ],
    price: 175,
    productType: ProductType.boiler_add_ons,
    productImage: "/products/boiler_add_ons/esi_boiler_thermostat/1.png",
    included: [`Parts and labour`],
    excluded: [`Smart controls`],
    descriptionMarkdown: `ESRTP4RFW is a wireless programmable room thermostat which is simple to install & easy to use. The control features OpenTherm, which automatically reduces the flow temperature of your boiler helping you save up to 15% on your gas use, significantly lowering bills.`
}, {
    model: "System chemical flush",
    specs: [],
    price: 595,
    productType: ProductType.boiler_add_ons,
    productImage: "/products/boiler_add_ons/system_chemical_flush/1.png",
    included: [`Parts and labour`],
    excluded: [],
    descriptionMarkdown: `
        Sentinel X100 Inhibitor 1L – a market-leading, heavy-duty central heating inhibitor that protects against corrosion and limescale, maximises heating efficiency, and helps extend the lifespan of your system.

        The industry-standard inhibitor delivers reliable protection for clean central heating systems against limescale and corrosion and is recommended by leading boiler manufacturers.
        This heavy-duty formula safeguards the system, helping to extend its lifespan, maintain peak efficiency, and reduce fuel consumption. It features a pH-neutral formulation for safe, effective performance.
    `
}, {
    model: "Hive Smart Thermostat",
    specs: [
        "Compatible with Amazon Alexa, Apple HomeKit, Google Home, iOS and Android apps",
        "Adjustable temperature range from 5–32°C",
        "Suitable for combi boilers",
        "Battery-powered thermostat",
        "2-wire receiver",
        "Touchscreen display",
        "1-year guarantee",
        "OpenTherm compatible",
        "Built-in frost protection and temperature graphing",
        "Includes smart hub"
    ],
    price: 250,
    productType: ProductType.boiler_add_ons,
    productImage: "/products/boiler_add_ons/hive_smart_thermostat/1.png",
    included: [`Parts and labour`],
    excluded: [],
    descriptionMarkdown: `
        The Hive V4 wireless smart heating thermostat provides intelligent temperature control for combi boilers, using proactive heating that runs only when required. Its responsive touchscreen interface works smoothly with Amazon Alexa, Apple HomeKit, Google Home, and both iOS and Android apps, allowing convenient remote control from anywhere.

        Battery powered and equipped with automatic frost protection, the Hive V4 also offers temperature graphs to monitor energy use and a 7-day programmable schedule with multiple on/off settings. Compatible with OpenTherm and suitable for wet underfloor heating, it enhances boiler efficiency while helping to reduce system wear. A smart hub is included for seamless home heating management. This is Version 4 of the 3rd Generation model.
    `
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});