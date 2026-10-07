import { ProductType, BoilerType, FuelType, FlueType, HtmlTag } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const boilers = [
    {
        brand: "Vaillant",
        model: "Eco Tech 826 Plus",
        homeowner: true,
        landlord: true,
        warranty: "7 years",
        specs: ["7 years warranty", `Smart home compatible for ease of use and heating optimisation`, `Intuitive semi-touch interface`, `Reduce fuel bills with precision heating`, `Quick hot water delivery in approximately 5 seconds`, `Hand-crafted boilers in an award-winning manufacturing plant`, `Quiet operation`, `Easy installation and maintenance`],
        price: 2780,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 2,
        boilerType: BoilerType.COMBI,
        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Designed for any home, the ecoTEC plus combination boiler from Vaillant is the ideal hot water solution. This flagship boiler offers a variety of models for you to choose from to suit all homes."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With precision heating and all new ioniDETECT technology, this innovative gas combustion monitoring technology ensures overall enhanced efficiency by reaching a wider modulation range of up to 1:10."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Take control of your boiler remotely with the intelligent myVAILLANT. The app is cleverly designed to allow complete control of your boiler through your smart phone and works on both Apple and Android. Whether you are checking your energy consumption, need up-to-date information about your heating system or want to improve the efficiency of your boiler; the myVAILLANT app allows complete control in the palm of your hands."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Vaillant are striving to offer low carbon solutions when it comes to their boilers, and that’s where the HyDeploy project comes in. This boiler is hydrogen prepared and has been successfully tested with up to 20% hydrogen mixed with natural gases."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With Vaillant’s LINbus technology, you can receive an accurate reading of flow rates and pressure differential, ensuring your boiler offers the highest performance possible."
            }
        ],
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_combi/main.png",
        productImages: ["/products/boilers/Vaillant_combi/main.png", "/products/boilers/Vaillant_combi/1.png", "/products/boilers/Vaillant_combi/2.png", "/products/boilers/Vaillant_combi/3.png", "/products/boilers/Vaillant_combi/4.png"],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 832ERP",
        homeowner: true,
        landlord: false,
        warranty: "7 years",
        specs: ["7 years warranty"],
        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Slimmed down range, with more flexibility. Most of the new ecoTEC plus models are now LPG convertible (excluding ecoTEC plus 840, 940 and 635). The conversion can be completed in minutes during commissioning stage, with no additional parts required, thanks to the new IoniDetect technology which continuously measures and adapts to different gas types. This allows us to streamline the range, whilst keeping it flexible for our installers needs."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Smart home ready* Works alongside the new plug-and-play myVAILLANT connect internet gateway, for easy connection with most Vaillant controls (excluding timeSWITCH 150 and timeSWITCH 160) and app connectivity in minutes * Terms and conditions apply, additional equipment may be required"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Refined and enhanced internal layout With easy access to all major components, making installation and servicing effortless"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Familiar footprint and external layout Retaining the same case dimensions, boiler footprint, flue position and pipe connections for an effortless likefor-like swap"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "New intuitive semi-touch interface Allowing for effortless first-time installation and set-up, with guided commissioning and set up wizard and easy to follow navigation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Automatic LPG conversion on most outputs (excluding ecoTEC plus 840, 940 and 635) Completed in minutes using the new intuitive interface, with no additional parts required"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "New IoniDETECT technology Intelligent gas combustion monitoring, helping the new ecoTEC plus reach wider modulation range of up to 1:10, for even greater system efficiency"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Sharpened intelligence with linBUS technology Enables more intelligent and accurate reading of flow rate and pressure differential via internal pump for improved performance"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Hydrogen prepared Suitable to work safely and efficiently with up to 20% hydrogen mix"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compatible with all Vaillant accessories and technologies Including most of our range of controls (excluding timeSWITCH 150 and timeSWITCH 160), flues, Boiler Protection Kits and renewable heating systems"
            }
        ],
        price: 2885,
        minBath: 1,
        maxBath: 2,
        minBed: 1,
        maxBed: 3,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_combi/main.png",
        productImages: ["/products/boilers/Vaillant_combi/main.png", "/products/boilers/Vaillant_combi/1.png", "/products/boilers/Vaillant_combi/2.png", "/products/boilers/Vaillant_combi/3.png", "/products/boilers/Vaillant_combi/4.png"],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 836 ERP",
        homeowner: true,
        landlord: false,
        warranty: "7 years",
        specs: ["7 years warranty", `Energy rating: A`],
        price: 3065,
        minBath: 1,
        maxBath: 2,
        minBed: 2,
        maxBed: 4,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_combi/main.png",
        productImages: ["/products/boilers/Vaillant_combi/main.png", "/products/boilers/Vaillant_combi/1.png", "/products/boilers/Vaillant_combi/2.png", "/products/boilers/Vaillant_combi/3.png", "/products/boilers/Vaillant_combi/4.png"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Suitable for one to two bathrooms"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Smart home compatible for ease of use and heating optimisation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "36kW heat output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Intuitive semi-touch interface"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Reduce fuel bills with precision heating"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quick hot water delivery in approximately 5 seconds"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Hand-crafted boilers in an award-winning manufacturing plant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet Mark awarded for quieter operation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Vaillant ecoTEC Plus 836 36kW Combi Boiler - 0010036017 Overview"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus 836 gas combi boiler is best suited for one to four users and one to two bathrooms, and this boiler only heats the water that you use, helping to reduce energy consumption and cutting energy costs."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Impressive Connectivity"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This Vaillant gas boiler enhances connectivity, and when paired with the brand's plug-and-play internet gateway, myVAILLANT connect, it enables app control, smart home integration and remote appliance care in just minutes for further efficiency."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Semi-Touch Interface"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This gas boiler features an intuitive semi-touch interface to provide effortless first-time installation and set up and an easy-to-follow navigation system."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Space Saving"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus 836 36kW combi boiler is space saving and doesn't require a separate cylinder or loft tank, making it ideal for smaller properties."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Quiet in Operation"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Awarded Quiet Mark, this Vaillant boiler provides quiet operation for a peaceful home, even when the boiler is powered on."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Frost Protection"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With frost damage protection, this boiler is designed to last a long time — even during colder seasons."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Additional information"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Output Central Heating: Nominal heat output range at 50/30˚C (Condensing mode)- 3.7–29.9kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "5-year guarantee (extended to 7 years if installed by a Vaillant installer)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Prevents frost damage"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 840ERP",
        homeowner: true,
        landlord: false,
        warranty: "7 years",
        specs: ["7 years warranty", `Energy rating: A`],
        price: 3225,
        minBath: 2,
        maxBath: 3,
        minBed: 3,
        maxBed: 5,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_combi/main.png",
        productImages: ["/products/boilers/Vaillant_combi/main.png", "/products/boilers/Vaillant_combi/1.png", "/products/boilers/Vaillant_combi/2.png", "/products/boilers/Vaillant_combi/3.png", "/products/boilers/Vaillant_combi/4.png"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Smart home compatible for ease of use and heating optimisation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Intuitive semi-touch interface"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "40kW heat output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Reduce fuel bills with precision heating"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quick hot water delivery in approximately 5 seconds"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Hand-crafted boilers in an award-winning manufacturing plant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet Mark awarded for quieter operation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "App compatibility"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Vaillant ecoTEC Plus 840 40kW Combi Boiler - 0010036018"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus 840 gas combi boiler has a 40kW heat output and features innovative gas combustion monitoring technology for enhanced efficiency."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Hydrogen prepared"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus is hydrogen prepared and is therefore suitable to work safely and efficiently with up to 20% hydrogen mix."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "App compatibility"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Take control of your boiler remotely with the intelligent myVAILLANT. The app is cleverly designed to allow complete control of your boiler through your smart phone and works on both Apple and Android. Whether you are checking your energy consumption, need up-to-date information about your heating system or want to improve the efficiency of your boiler; the myVAILLANT app allows complete control in the palm of your hands."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "linBUS technology"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Additionally, the Vaillant ecoTEC Plus 840 Gas Combination Boiler boasts sharpened intelligence with linBUS technology. This technology enables more intelligent and accurate readings of flow rates and pressure differential via the internal pump."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "IoniDETECT technology"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This Vaillant gas boiler features IoniDETECT technology for intelligent gas combustion monitoring for improved system efficiency."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Additional Information"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Output Central Heating: Nominal heat output range at 50/30˚C (Condensing mode)- 4.5–29.8kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "5-year guarantee (extended to 7 years if installed by a Vaillant installer)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "IoniDETECT technology"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 940ERP",
        homeowner: true,
        landlord: false,
        warranty: "7 years",
        specs: ["7 years warranty", `Energy rating: A`],
        price: 3635,
        minBath: 2,
        maxBath: 3,
        minBed: 3,
        maxBed: 6,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_combi/main.png",
        productImages: ["/products/boilers/Vaillant_combi/main.png", "/products/boilers/Vaillant_combi/1.png", "/products/boilers/Vaillant_combi/2.png", "/products/boilers/Vaillant_combi/3.png", "/products/boilers/Vaillant_combi/4.png"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Smart home compatible for ease of use and heating optimisation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Intuitive semi-touch interface"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "40kW heat output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Reduce fuel bills with precision heating"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quick hot water delivery in approximately 5 seconds"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Hand-crafted boilers in an award-winning manufacturing plant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet Mark awarded for quieter operation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "App compatibility"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Vaillant ecoTEC Plus 940 40kW Combi Boiler 0010036114"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Vaillant ecoTEC Plus 940 40kW Combi Boiler - 0010036114 Overview"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus 940 gas combi boiler has a 40kW heat output and features innovative gas combustion monitoring technology for enhanced efficiency."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "App Compatibility"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Take control of your boiler remotely with the intelligent myVAILLANT. The app is cleverly designed to allow complete control of your boiler through your smart phone and works on both Apple and Android. Whether you are checking your energy consumption, need up-to-date information about your heating system or want to improve the efficiency of your boiler; the myVAILLANT app allows complete control in the palm of your hands."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "IoniDETECT Technology"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This Vaillant gas boiler features IoniDETECT technology for intelligent gas combustion monitoring for improved system efficiency."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Additional information"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Output Central Heating: Nominal heat output range at 50/30˚C (Condensing mode)- 4.5–29.8kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "5-year guarantee (extended to 7 years if installed by a Vaillant installer)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "IoniDETECT technology"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 612",
        homeowner: true,
        landlord: true,
        warranty: "5 years",
        specs: ["5 years warranty"],
        price: 2995,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 1,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],

        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Labelled the go anywhere boiler, the Vaillant ecoFIT pure 612 is part of Vaillant's exciting and dynamic range of system boilers, ideal for smaller properties. The compact size and optional rear flue fitting means this boiler is ideal for even the snuggest of installations including kitchen cupboards and small cloakroom spaces. Quiet Mark-approved, the ecoFIT pure 612 is ultra-quiet making it perfect for installations in social spaces and high-traffic areas of a home. Combining the best of German engineering and British manufacturing, the ecoFIT pure 612 is resilient and built for a long-life. It features a clear LED display for visibility in dimly lit areas and simple, easy to use controls."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "ErP A rated boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Patented high-specification aluminium heat exchanger"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Boiler Plus compliant with time and temperature controls"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Precise German engineering and design"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Recognisable Vaillant fault codes"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Push-Fit flue system with industry leading flue lengths"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Built-in two stage frost protection"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Patented four-sided cooling and water agitation of the heat exchanger"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Wide modulation range of up to 1:5"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Top and rear flue options"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 615",
        homeowner: true,
        landlord: false,
        warranty: "5 years",
        specs: ["5 years warranty"],
        price: 3150,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 3,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],

        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Labelled the \"go anywhere\" boiler, the Vaillant ecoFIT pure 615 is part of Vaillant's exciting and dynamic range of system boilers, ideal for smaller properties. The compact size and optional rear flue fitting means this boiler is ideal for even the snuggest of installations including kitchen cupboards and small cloakroom spaces. Quiet Mark-approved, the ecoFIT pure 615 is ultra-quiet making it perfect for installations in social spaces and high-traffic areas of a home. Combining the best of German engineering and British manufacturing, the ecoFIT pure 615 is resilient and built for a long-life. The clear LED display, coupled with the easy to recognise Vaillant fault codes create a simple to use system where the heating can be controlled to the desired temperature, ensuring maximum efficiency within the heating system. The fault codes also provide quick and accurate information necessary for servicing and diagnosing what is wrong with the system."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "ErP A rated boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact, cupboard fit solution - small boiler footprint, offering flexibility of siting"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "10m (60/100) and 25m (80/125) flue lengths for maximum siting freedom"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compatible with Vaillant’s intelligent range of controls - for the most convenient and energy efficient system"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High-specification aluminium heat exchanger - designed to last longer, be easily maintained, and give reduced energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Clear LED display - Offers visibility in dimly lit areas for easier installation and use"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High quality components - Offering peace of mind for the lifetime of the product"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance - layout allows all components to be accessed from the boiler front"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Guarantee upgradeable to 10 years when registered through Vaillant Advance with an Advance boiler protection kit."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 620",
        homeowner: true,
        landlord: false,
        warranty: "5 years",
        specs: [
            "5 years warranty",
            `Smart home compatible for ease of use and heating optimisation`,
            `Intuitive semi-touch interface`,
            `Reduce fuel bills with precision heating`,
            `Quick hot water delivery in approximately 5 seconds`,
            `Hand-crafted boilers in an award-winning manufacturing plant`,
            `Quiet operation`,
            `Easy installation and maintenance`
        ],
        price: 3345,
        minBath: 1,
        maxBath: 2,
        minBed: 1,
        maxBed: 4,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],

        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Designed for any home, the ecoTEC plus system boiler from Vaillant is the ideal hot water solution. This flagship boiler offers a variety of models for you to choose from to suit all homes."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With precision heating and all new ioniDETECT technology, this innovative gas combustion monitoring technology ensures overall enhanced efficiency by reaching a wider modulation range of up to 1:9."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Take control of your boiler remotely with the intelligent myVAILLANT. The app is cleverly designed to allow complete control of your boiler through your smart phone and works on both Apple and Android. Whether you are checking your energy consumption, need up-to-date information about your heating system or want to improve the efficiency of your boiler; the myVAILLANT app allows complete control in the palm of your hands."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Vaillant are striving to offer low carbon solutions when it comes to their boilers, and that’s where the HyDeploy project comes in. This boiler is hydrogen prepared and has been successfully tested with up to 20% hydrogen mixed with natural gases."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With Vaillant’s LINbus technology, you can receive an accurate reading of flow rates and pressure differential, ensuring your boiler offers the highest performance possible."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Additional information:"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Energy rating: A"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Output Central Heating: Nominal heat output range at 50/30˚C (Condensing mode)- 2.8-21.2kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "5 year guarantee"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 625",
        homeowner: true,
        landlord: false,
        warranty: "5 years",
        specs: ["5 years warranty"],
        price: 3690,
        minBath: 2,
        maxBath: 3,
        minBed: 2,
        maxBed: 4,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],

        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Labelled the \"go anywhere\" boiler, the Vaillant ecoFIT pure 625 is part of Vaillant's exciting and dynamic range of system boilers, ideal for smaller properties. The compact size and optional rear flue fitting means this boiler is ideal for even the snuggest of installations including kitchen cupboards and small cloakroom spaces. Quiet Mark-approved, the ecoFIT pure 625 is ultra-quiet making it perfect for installations in social spaces and high-traffic areas of a home. Combining the best of German engineering and British manufacturing, the ecoFIT pure 625 is resilient and built for a long-life. The clear LED display, coupled with the easy to recognise Vaillant fault codes create a simple to use system where the heating can be controlled to the desired temperature, ensuring maximum efficiency within the heating system. The fault codes also provide quick and accurate information necessary for servicing and diagnosing what is wrong with the system."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "ErP A rated boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact, cupboard fit solution - small boiler footprint, offering flexibility of siting"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "10m (60/100) and 25m (80/125) flue lengths for maximum siting freedom"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compatible with Vaillant’s intelligent range of controls - for the most convenient and energy efficient system"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High-specification aluminium heat exchanger - designed to last longer, be easily maintained, and give reduced energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Clear LED display - Offers visibility in dimly lit areas for easier installation and use"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High quality components - Offering peace of mind for the lifetime of the product"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance - layout allows all components to be accessed from the boiler front"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Guarantee upgradeable to 10 years when registered through Vaillant Advance with an Advance boiler protection kit."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 630",
        homeowner: true,
        landlord: false,
        warranty: "5 years",
        specs: ["5 years warranty"],
        price: 3845,
        minBath: 2,
        maxBath: 3,
        minBed: 3,
        maxBed: 6,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],

        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Labelled the \"go anywhere\" boiler, the Vaillant ecoFIT pure 630 is part of Vaillant's exciting and dynamic range of system boilers, ideal for smaller properties. The compact size and optional rear flue fitting means this boiler is ideal for even the snuggest of installations including kitchen cupboards and small cloakroom spaces. Quiet Mark-approved, the ecoFIT pure 630 is ultra-quiet making it perfect for installations in social spaces and high-traffic areas of a home. Combining the best of German engineering and British manufacturing, the ecoFIT pure 630 is resilient and built for a long-life. The clear LED display, coupled with the easy to recognise Vaillant fault codes create a simple to use system where the heating can be controlled to the desired temperature, ensuring maximum efficiency within the heating system. The fault codes also provide quick and accurate information necessary for servicing and diagnosing what is wrong with the system."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "ErP A rated boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact, cupboard fit solution - small boiler footprint, offering flexibility of siting"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "10m (60/100) and 25m (80/125) flue lengths for maximum siting freedom"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compatible with Vaillant’s intelligent range of controls - for the most convenient and energy efficient system"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High-specification aluminium heat exchanger - designed to last longer, be easily maintained, and give reduced energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Clear LED display - Offers visibility in dimly lit areas for easier installation and use"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "High quality components - Offering peace of mind for the lifetime of the product"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance - layout allows all components to be accessed from the boiler front"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Guarantee upgradeable to 10 years when registered through Vaillant Advance with an Advance boiler protection kit."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Vaillant",
        model: "Eco Tech Plus 635",
        homeowner: true,
        landlord: false,
        warranty: "5 years",
        specs: ["5 years warranty", `Energy rating: A`],
        price: 4095,
        minBath: 2,
        maxBath: 3,
        minBed: 4,
        maxBed: 6,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Vaillant_system/main.png",
        productImages: ["/products/boilers/Vaillant_system/main.png", "/products/boilers/Vaillant_system/1.png", "/products/boilers/Vaillant_system/2.png", "/products/boilers/Vaillant_system/3.png", "/products/boilers/Vaillant_system/4.png"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Smart home compatible for ease of use and heating optimisation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "35kW heat output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Intuitive semi-touch interface"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Reduce fuel bills with precision heating"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quick hot water delivery in approximately 5 seconds"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Hand-crafted boilers in an award-winning manufacturing plant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy installation and maintenance"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Vaillant ecoTEC Plus 635 35kW System Boiler - 0010036014"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Vaillant ecoTEC Plus 635 gas system boiler is smart home ready to provide precise temperature control and energy efficiency during use. Designed with ioniDETECT technology, this gas boiler provides intelligent gas combustion monitoring for enhanced system efficiency, ensuring durability by reaching a wider modulation range of up to 1:9."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "App Compatibility and Semi-Touch Interface"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Take control of your boiler remotely with the intelligent myVAILLANT. The app is cleverly designed to allow complete control of your boiler through your smart phone and works on both Apple and Android. Whether you are checking your energy consumption, need up-to-date information about your heating system or want to improve the efficiency of your boiler; the myVAILLANT app allows complete control in the palm of your hands."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Furthermore, the semi-touch interface makes it quick and easy to make adjustments in a second."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Accurate Reading of Flow Rate"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "With built-in LINbus technology, this boiler provides intelligent and accurate reading of flow rate and pressure via the internal pump for improved performance."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Quick Hot Water Delivery"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The most impressive feature of this boiler is the quick hot water delivery in around 5 seconds, helping to prevent delays."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Additional information:"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Output Central Heating: Nominal heat output range at 50/30˚C (Condensing mode)- 5.0–37.7kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet operation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "App compatibility"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Baxi",
        model: "825kw",
        homeowner: true,
        landlord: true,
        specs: [
            `Complete with Adey Micro2 System Filter`,
            `Compatible with the Megaflo Eco Cylinders`,
            `Easy to manoeuvre`,
            `Simple hanging bracket`,
            `Pipes behind facility within the boiler casing`,
            `Compact cupboard fit`,
            `Compatible with Multifit flue kits`,
            `An output and model for most sizes of property`,
            `Protects the heating system and boiler`,
            `ErP rating: A`
        ],
        price: 2860,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 1,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Baxi_combi/main.png",
        productImages: ["/products/boilers/Baxi_combi/main.png", "/products/boilers/Baxi_combi/baxi-800-combi-2-thumbnail.png"],
        description: [
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Baxi 800 System series comes with the compact Adey Magnaclean Micro2 magnetic system filter and a 10 year parts and labour warranty for your peace of mind. The boiler is small enough to fit into a 290mm deep cupboard, has a built in pipes behind facility within the boiler casing and brass hydraulics. It is compatible with Megaflo Eco cylinders, making it the perfect choice for homes with high demand for hot water."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Baxi",
        model: "830KW",
        homeowner: true,
        landlord: false,
        specs: [
            `Complete with Adey Micro2 System Filter`,
            `Compatible with the Megaflo Eco Cylinders`,
            `Easy to manoeuvre`,
            `Simple hanging bracket`,
            `Pipes behind facility within the boiler casing`,
            `Compact cupboard fit`,
            `Compatible with Multifit flue kits`,
            `An output and model for most sizes of property`,
            `Protects the heating system and boiler`,
            `ErP rating: A`
        ],
        price: 3049,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 3,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Baxi_combi/main.png",
        productImages: ["/products/boilers/Baxi_combi/main.png", "/products/boilers/Baxi_combi/baxi-800-combi-2-thumbnail.png"],

        description: [
            {
                "tag": HtmlTag.HEADER,
                "content": "Baxi 800 830 Heat Only Boiler ErP"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Baxi 800 System series comes with the compact Adey Magnaclean Micro2 magnetic system filter and a 10 year parts and labour warranty for your peace of mind. The boiler is small enough to fit into a 290mm deep cupboard, has a built in pipes behind facility within the boiler casing and brass hydraulics. It is compatible with Megaflo Eco cylinders, making it the perfect choice for homes with high demand for hot water."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Baxi",
        model: "36KW",
        homeowner: true,
        landlord: false,
        specs: [],
        price: 3250,
        minBath: 2,
        maxBath: 3,
        minBed: 2,
        maxBed: 6,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Baxi_combi/main.png",
        productImages: ["/products/boilers/Baxi_combi/main.png", "/products/boilers/Baxi_combi/baxi-400-heat-2_1_1_1-Photoroom.png"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Outputs 25kW, 30kW, 36kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact Adey Magnaclean Micro 2 magnetic system filter included"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact cupboard fit"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "OpenTherm interface"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compatible with Baxi uSense"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Simple hanging bracket"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Pipes behind facility within the boiler casing"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Top central flue"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "To meet different end user hot water requirements (up to 15 litres per minute)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Protects the heating system and boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Can be installed in a 290mm deep cupboard"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Gives greater control of the boiler when installed with compatible OpenTherm controls"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Heating can be operated via a smart device"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy to install giving greater flexibility of pipework connections"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Save time, space and money by piping behind within the footprint of the boiler"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Easy to replace old boiler, saving time"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Flu Included (Horizontal)"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Main",
        model: "25kw Eco Compact ",
        homeowner: true,
        landlord: true,
        warranty: "5 years",
        specs: ["5 years warranty", `ErP rating: A`],
        price: 2220,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 2,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Main_system/1.png",
        productImages: ["/products/boilers/Main_system/1.png", "/products/boilers/Main_system/2.png", "/products/boilers/Main_system/3.png", "/products/boilers/Main_system/4.png"],
        description:[
            {
                "tag": HtmlTag.LIST,
                "content": "25kW output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Boiler Plus compliant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Energy Saving Trust Endorsed"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "29.5kg lift weight"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Low NOx emissions - rated class 5 (the best)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Brass hydraulics block"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Optional stand off frame"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Rigid filling link"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Main Eco Compact 25kW Natural Gas Combination Boiler ErP - 7714519 Overview"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Main Eco Compact gas combi boiler has a 25kW output and is Boiler Plus compliant and Energy-Saving Trust endorsed, enabling this gas boiler to be energy efficient."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Compact Fit"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This Main Eco Compact boiler is lightweight and compact, designed to fit into cupboards for convenient storage without taking up space in rooms."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Main",
        model: "30kw Eco Compact ",
        homeowner: true,
        landlord: true,
        warranty: "5 years",
        specs: ["5 years warranty"],
        price: 2349,
        minBath: 1,
        maxBath: 2,
        minBed: 2,
        maxBed: 4,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Main_combi/1.png",
        productImages: ["/products/boilers/Main_combi/1.png", "/products/boilers/Main_combi/2.png", "/products/boilers/Main_combi/3.png", "/products/boilers/Main_combi/4.png"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "30kW output"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Boiler-Plus compliant"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Energy-Saving Trust Endorsed"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "29.5kg lift weight"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Thermostat compatibility: Baxi uSense"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Low NOx emissions - rated class 5 (the best)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Brass hydraulics block"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Top central flue"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Optional stand off frame"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Rigid filling link"
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Main Eco Compact 30kW Combi Gas Boiler ErP - 7714161 Overview"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Main Eco Compact 30kW gas combi boiler is a perfect cupboard-fit, lightweight boiler, compatible with the Baxi uSense smart thermostat."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This gas boiler has a 30kW output, making it suitable to heat larger properties with more than one bathroom and multiple radiators."
            },
            {
                "tag": HtmlTag.HEADER,
                "content": "Energy Efficient"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "This boiler is designed to be energy efficient, converting 94% of the fuel used into heat, helping you reduce your energy bills and cut costs on your energy bills."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Best of all, the Main Eco Compact 30kW boiler is Boiler-Plus compliant and is Energy-Saving Trust endorsed to remain energy efficient."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Main",
        model: "15kw Eco Compact ",
        homeowner: true,
        landlord: true,
        warranty: "5 years",
        specs: [
            "5 years warranty",
            `Choice of 15kW or18kW`,
            `5-years parts and labour warranty`,
            `Boiler Plus compliant`,
            `Energy Saving Trust Endorsed`,
            `28kg lift weight`
        ],
        price: 2785,
        minBath: 1,
        maxBath: 1,
        minBed: 1,
        maxBed: 2,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Main_system/1.png",
        productImages: ["/products/boilers/Main_system/1.png", "/products/boilers/Main_system/2.png", "/products/boilers/Main_system/3.png", "/products/boilers/Main_system/4.png"],
        description: [
            {
                "tag": HtmlTag.HEADER,
                "content": "Main Eco Compact 15kW Natural Gas System Boiler"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Main Eco 15kW System Boiler is the perfect choice for householders were space is limited with the new cupboard fit design. Easy to install and service, with front access to all components and central top flue, good looks and simple controls this will more than satisfy your household needs."
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Compact cupboard fit"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Low NOx emissions - rated class 5 (the best)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Brass hydraulics block"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Top central flue"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Optional stand off frame"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "ErP rating: A"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Determining the right type of Boiler is a major decision. After you determine that Gas System Boilers give the correct answer then the Main Eco Compact 15kW Natural Gas System Boiler ErP - 7714605 is assuredly worth putting on the shortlist."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Main",
        model: "18kw Eco Compact",
        homeowner: true,
        landlord: true,
        warranty: "5 years",
        specs: [
            "5 years warranty",
            `Choice of 15kW or18kW`,
            `5-years parts and labour warranty`,
            `Boiler Plus compliant`,
            `Energy Saving Trust Endorsed`,
            `28kg lift weight`,
            `Compact cupboard fit`
        ],
        price: 2889,
        minBath: 1,
        maxBath: 2,
        minBed: 2,
        maxBed: 5,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Main_system/1.png",
        productImages: ["/products/boilers/Main_system/1.png", "/products/boilers/Main_system/2.png", "/products/boilers/Main_system/3.png", "/products/boilers/Main_system/4.png"],
        description: [
            {
                "tag": HtmlTag.HEADER,
                "content": "Main Eco Compact 18kW Natural Gas System Boiler"
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "The Main Eco 18kW System Boiler is the perfect choice for householders were space is limited with the new cupboard fit design. Easy to install and service, with front access to all components and central top flue, good looks and simple controls this will more than satisfy your household needs."
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Deciding on the right kind of Boiler is a major decision. Once you determine that Gas System Boilers are the appropriate solution then the Main 7714606 is without doubt worth adding to the shortlist."
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "4000 25kW Combi Gas Boiler",
        homeowner: true,
        landlord: true,
        warranty: "10 years",
        specs: ["10 years warranty", `ErP rating: A`],
        price: 2820,
        minBath: 0,
        maxBath: 0,
        minBed: 1,
        maxBed: 2,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Left_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Right_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_091 (1) (1)-Photoroom.png","/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_094 (1) (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_4000/4000-Traditional_Kitchen-face-on.png", "/products/boilers/Worcester_combi/Worcester_4000/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Wide power range helps to reduce gas consumption and lower energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Innovative 'Quick Tap' water saving function helps you reduce water waste"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "The modern new design comes with an easy to use colour display"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Operates extremely well in low water pressure areas, ensuring powerful and warm showers"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "One of the quietest combi boilers available, making it easy to live with"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Features wireless connectivity with the Bosch EasyControl"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Instantaneous hot water, always available"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Suitable for small to medium homes"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "4000 30kW Combi Gas Boiler",
        homeowner: true,
        landlord: true,
        warranty: "10 years",
        specs: ["10 years warranty", `ErP rating: A`],
        price: 2900,
        minBath: 1,
        maxBath: 1,
        minBed: 2,
        maxBed: 2,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Left_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Right_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_091 (1) (1)-Photoroom.png","/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_094 (1) (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_4000/4000-Traditional_Kitchen-face-on.png", "/products/boilers/Worcester_combi/Worcester_4000/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Wide power range helps to reduce gas consumption and lower energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Innovative 'Quick Tap' water-saving function helps you reduce water waste"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "The modern new design comes with an easy-to-use colour display"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Operates extremely well in low water pressure areas, ensuring powerful and warm showers"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "One of the quietest combi boilers available, making it easy to live with"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Features wireless connectivity with the Bosch EasyControl"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Instantaneous hot water, always available"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Suitable for small to medium homes"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "2000 30kW Combi Gas Boiler",
        homeowner: true,
        landlord: true,
        warranty: "6 years",
        specs: ["6 years warranty", `ErP A-rated efficiency (94% ErP efficiency in central heating)`],
        price: 2945,
        minBath: 0,
        maxBath: 0,
        minBed: 0,
        maxBed: 0,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_2000/main_2000.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_2000/main_2000.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcs_Condens_2000_Front.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcester_2000_Left.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcester_2000_Right.png"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Winner of the Which? Best Buy Award"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Ideal for reducing gas consumption"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet Mark accredited – operates at 47dB(A)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Market-leading 1:10 modulation range - modulates down to 3kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "In-line hydraulic and gas connections"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Pre-wired mains cable"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "PRV positioned for many pipe routing options"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Rear piping accessories for more flexible installation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Fully compatible with  wireless RF controls and all third party external 230V controls on the market"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "7-year guarantee when installed with any system filter*"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Max flue length: 21m horizontal and 21m vertical"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "2000 25kW Combi Gas Boiler",
        homeowner: true,
        landlord: true,
        warranty: "6 years",
        specs: ["6 years warranty", `ErP A-rated efficiency (94% ErP efficiency in central heating)`],
        price: 2825,
        minBath: 0,
        maxBath: 0,
        minBed: 0,
        maxBed: 0,
        boilerType: BoilerType.COMBI,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_2000/main_2000.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_2000/main_2000.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcs_Condens_2000_Front.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcester_2000_Left.png", "/products/boilers/Worcester_combi/Worcester_2000/Worcester_2000_Right.png"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Winner of the Which? Best Buy Award"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Ideal for reducing gas consumption"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Quiet Mark accredited – operates at 47dB(A)"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Market-leading 1:10 modulation range - modulates down to 3kW"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "In-line hydraulic and gas connections"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Pre-wired mains cable"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "PRV positioned for many pipe routing options"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Rear piping accessories for more flexible installation"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Fully compatible with  wireless RF controls and all third party external 230V controls on the market"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "7-year guarantee when installed with any system filter*"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Max flue length: 21m horizontal and 21m vertical"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Systems",
        model: "4000 15kW System Gas Boiler",
        homeowner: true,
        landlord: false,
        warranty: "10 years",
        specs: ["10 years warranty", "ErP rating: A"],
        price: 3325,
        minBath: 0,
        maxBath: 0,
        minBed: 0,
        maxBed: 0,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Left_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Right_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_091 (1) (1)-Photoroom.png","/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_094 (1) (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_4000/4000-Traditional_Kitchen-face-on.png", "/products/boilers/Worcester_combi/Worcester_4000/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Wide power range helps to reduce gas consumption and lower energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "The modern new design comes with an easy to use colour display"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Our quietest system boiler, making it easy to live with"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Features wireless connectivity with the Bosch EasyControl"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Suitable for homes where the heating system includes a hot water storage cylinder"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Can be used with Greenskies solar panels for energy and cost savings"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "4000 21kW System Gas Boiler",
        homeowner: true,
        landlord: false,
        warranty: "10 years",
        specs: ["10 years warranty", "ErP rating: A"],
        price: 3495,
        minBath: 0,
        maxBath: 0,
        minBed: 2,
        maxBed: 5,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_4000/main-4000_Front_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Left_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/main-4000_Right_Facing.png", "/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_091 (1) (1)-Photoroom.png","/products/boilers/Worcester_combi/Worcester_4000/20201215_worcester_bosch_094 (1) (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_4000/4000-Traditional_Kitchen-face-on.png", "/products/boilers/Worcester_combi/Worcester_4000/Worcester_Bosch_Greenstar_400_Kitchen_HERO_CROPPED.jpg"],

        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Wide power range helps to reduce gas consumption and lower energy bills"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "The modern new design comes with an easy to use colour display"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Our quietest system boiler, making it easy to live with"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Features wireless connectivity with the Bosch EasyControl"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Suitable for homes where the heating system includes a hot water storage cylinder"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Can be used with Greenskies solar panels for energy and cost savings"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "8000+ 35kW Gas System Boiler",
        homeowner: true,
        landlord: false,
        warranty: "12 years",
        specs: ["12 years warranty", `ErP rating: A`],
        price: 3850,
        minBath: 1,
        maxBath: 2,
        minBed: 2,
        maxBed: 5,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_8000/main_8000.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_8000/main_8000.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Inside_Story (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Left (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Right (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Utility_736x414.jpg", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Which_24_1080x1080"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Rear piping"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Pre-plumbing jig"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Full colour display"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "94% heating efficiency"
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Up to a 12-year guarantee when installed by a  accredited installer"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    },
    {
        brand: "Worecester Greenstar",
        model: "8000+ 30kW Gas System Boiler",
        homeowner: true,
        landlord: false,
        warranty: "12 years",
        specs: ["12 years warranty", `ErP rating: A`],
        price: 4095,
        minBath: 0,
        maxBath: 0,
        minBed: 0,
        maxBed: 0,
        boilerType: BoilerType.SYSTEM,
        productType: ProductType.boiler,
        productImage: "/products/boilers/Worcester_combi/Worcester_8000/main_8000.png",
        productImages: ["/products/boilers/Worcester_combi/Worcester_8000/main_8000.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Inside_Story (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Left (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Right (1)-Photoroom.png", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Utility_736x414.jpg", "/products/boilers/Worcester_combi/Worcester_8000/Worcester_Bosch_8000_Which_24_1080x1080"],
        description: [
            {
                "tag": HtmlTag.LIST,
                "content": "Rear piping" 
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Pre-plumbing jig" 
            },
            {
                "tag": HtmlTag.LIST,
                "content": "Full colour display" 
            },
            {
                "tag": HtmlTag.LIST,
                "content": "94% heating efficiency" 
            },
            {
                "tag": HtmlTag.PARAGRAPH,
                "content": "Up to a 12-year guarantee when installed by a  accredited installer"
            }
        ],
        fuelType: FuelType.GAS,
        flueType: FlueType.HORIZONTAL
    }
].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});

