import { BoilerType, FuelType } from "@prisma/client";
import { ACTIONS, ANSWER_TYPES, TQuestions } from "../../_types";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";
import { EXPLANATION_CONTENT } from "../../Question/Explanation/_helper";


export const BOILER_START_NODE = "BOILER_Q00";

export const BOILER_QUESTIONS: TQuestions = {
    BOILER_Q00: {
        id: "BOILER_Q00",
        label: "About you",
        content: 'Are you a homeowner or a landlord?',
        fieldName: "isLandlord",
        help: ["This helps us tailor your boiler quote and ensure the right compliance documentation for your installation."],
        answers: [{
            content: 'HOMEOWNER',
            icon: QUESTIONNAIRE_IMAGES.HOMEOWNER,
            value: false,
            nextNode: 'BOILER_Q01'
        }, {
            content: 'LANDLORD',
            icon: QUESTIONNAIRE_IMAGES.LANDLORD,
            value: true,
            nextNode: 'BOILER_LANDLORD_Q01'
        }]
    },
    BOILER_LANDLORD_Q01: {
        id: "BOILER_LANDLORD_Q01",
        label: "About your property",
        content: "Do you have a current Gas Safety Record (CP12)?",
        fieldName: "hasGasSafetyRecord",
        help: ["UK landlords are legally required to have a Gas Safety Certificate renewed annually. If you don't have one, we can arrange this as part of your installation."],
        info: { title: "About CP12", content: "A CP12 is issued by a Gas Safe registered engineer and must be renewed every 12 months. If yours has lapsed or you've never had one, that's fine — we can include it with your installation. Questions? Call us on", phone: "03335770017" },
        answers: [{
            content: 'YES, I DO',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_LANDLORD_Q02'
        }, {
            content: "NO, I DON'T",
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_LANDLORD_Q02'
        }]
    },
    BOILER_LANDLORD_Q02: {
        id: "BOILER_LANDLORD_Q02",
        label: "About your property",
        content: "Will a tenant be present during installation?",
        fieldName: "tenantPresent",
        help: ["This helps us coordinate access and schedule the installation at a time that works for everyone."],
        answers: [{
            content: 'YES, THEY WILL',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_LANDLORD_Q03'
        }, {
            content: "NO, I'LL BE THERE",
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_LANDLORD_Q03'
        }]
    },
    BOILER_LANDLORD_Q03: {
        id: "BOILER_LANDLORD_Q03",
        label: "About your property",
        content: "Is your tenant currently without heating or hot water?",
        fieldName: "tenantWithoutHeating",
        help: ["If your tenant has no heating or hot water, we'll prioritise your job as an emergency."],
        answers: [{
            content: 'YES, IT IS AN EMERGENCY',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q01'
        }, {
            content: 'NO, IT CAN WAIT',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q01'
        }]
    },
    BOILER_Q01: {
        id: "BOILER_Q01",
        content: 'Is your boiler on mains gas?',
        fieldName: "onMainGas",
        answers: [{
            content: 'Yes',
            icon: QUESTIONNAIRE_IMAGES.YES,
            value: true,
            nextNode: 'BOILER_Q03'
        }, {
            content: 'No',
            icon: QUESTIONNAIRE_IMAGES.NO,
            value: false,
            nextNode: 'BOILER_Q02'
        }],
        help: ["Not sure? Check your energy bill or look for a gas meter in your home."],
        info: {
            title: "Which fuel do I have?",
            content: "Most UK homes run on mains gas but we want to make sure we find you the right boiler. If you are unsure, please call us on",
            phone: "03335770017"
        }
    },
    BOILER_Q02: {
        id: "BOILER_Q02",
        content: 'What type of gas does your boiler use?',
        fieldName: "fuelPowers",
        answers: [{
            content: 'Bottled Gas/LPG',
            value: FuelType.LPG,
            icon: QUESTIONNAIRE_IMAGES.LPG,
            nextNode: 'BOILER_Q03',
            tooltip: {
                title: `LPG`,
                content: `LPG (liquefied petroleum gas) is stored in tanks or cylinders and delivered to your home, rather than coming through regular gas pipes.`
            }
        }, {
            content: 'OTHER',
            value: FuelType.UNKNOWN,
            icon: QUESTIONNAIRE_IMAGES.OTHER,
            nextNode: 'BOILER_END'
        }]
    },
    BOILER_Q03: {
        id: "BOILER_Q03",
        content: `Do you know what kind of boiler you’ve got?`,
        fieldName: "boilerType",
        answers: [{
            content: 'YES, I KNOW',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q05'
        }, {
            content: 'NO, I’M NOT ENTIRELY SURE',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q04'
        }]
    },
    BOILER_Q04: {
        id: "BOILER_Q04",
        content: 'Do you have a hot water tank or cylinder in your home?',
        fieldName: "hasTankOrCylinder",
        answers: [{
            content: 'YES, IT HAS A TANK',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q06'
        }, {
            content: 'NO, IT DOESN’T HAVE A TANK',
            icon: QUESTIONNAIRE_IMAGES.NO,
            value: false,
            nextNode: 'BOILER_Q08'
        }],
        help: [`A hot water tank or cylinder stores hot water and is usually in your loft, airing cupboard, or utility room.` ],
        info: {
            title: "What to look for",
            content: "A hot water cylinder is typically a large copper or foam-insulated tank. A cold water tank is usually in the loft. If you have neither, you likely have a combi boiler already."
        }
    },
    BOILER_Q05: {
        id: "BOILER_Q05",
        content: 'What kind of boiler do you have?',
        fieldName: "currentTypeOfBoiler",
        answers: [{
            content: 'System Boiler',
            value: BoilerType.SYSTEM,
            icon: QUESTIONNAIRE_IMAGES.SYSTEM_BOILER,
            tooltip: {
                title: `System Boiler`,
                content: `A boiler that works with a hot water cylinder to store water for your home’s heating and hot water.`
            },
            nextNode: 'BOILER_Q07'
        }, {
            content: 'Regular/ Standard Boiler',
            value: BoilerType.STANDARD,
            icon: QUESTIONNAIRE_IMAGES.STANDARD_BOILER,
            tooltip: {
                title: `Regular Boiler`,
                content: `A traditional boiler that uses both a hot water cylinder and a cold water tank in the loft.`
            },
            nextNode: 'BOILER_Q07'
        }, {
            content: 'Combi Boiler',
            value: BoilerType.COMBI,
            icon: QUESTIONNAIRE_IMAGES.COMBI_BOILER,
            tooltip: {
                title: `Combi Boiler`,
                content: `A compact boiler that heats water on demand and provides central heating, without needing a hot water tank.`    
            },
            nextNode: 'BOILER_Q08'
        }, {
            content: 'Back Boiler',
            value: BoilerType.BACK,
            icon: QUESTIONNAIRE_IMAGES.BACK_BOILER,
            tooltip: {
                title: `Back Boiler`,
                content: `A boiler fitted behind a fireplace, supplying central heating and hot water.`
            },
            nextNode: 'BOILER_Q19'
        }],
        info: {
            title: "Not sure which type?",
            content: "Not sure which type you have? If there's a tank in the loft or a cylinder in an airing cupboard, it's likely a regular or system boiler. No tank anywhere? It's probably a combi.",
            mobileOnly: true
        }
    },
    BOILER_Q06: {
        id: "BOILER_Q06",
        content: 'Does your boiler have a pressure gauge?',
        fieldName: "hasPressureGauge",
        answers: [{
            content: 'YES,  IT DOES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q07'
        }, {
            content: `NO, IT DOESN’T`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q07'
        }],
        help: [`A boiler pressure gauge is a small dial, usually on the front of your boiler, showing the water pressure of your heating system.` ],
        info: {
            title: "Finding the pressure gauge",
            content: "The gauge is usually a small circular dial on the front or underside of the boiler, with a scale from 0–4 bar. A healthy reading sits between 1–2 bar. If you can't find it or aren't sure, please call us on",
            phone: "03335770017"
        }
    },
    BOILER_Q07: {
        id: "BOILER_Q07",
        content: 'Would you like to upgrade to a combi boiler?',
        fieldName: "wantACombiBoiler",
        answers: [{
            content: 'NO, I LIKE MY CURRENT SETUP',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q08'
        }, {
            content: 'YES, I WANT A COMBI BOILER',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q08'
        }],
        help: [`Upgrading to a combi boiler is energy efficient, saves space, and heats water on demand, so you don’t waste energy storing hot water.`]
    },
    BOILER_Q08: {
        id: "BOILER_Q08",
        content: 'Do you want to keep the boiler where it is?',
        fieldName: "isboilerSamePlace",
        answers: [{
            content: 'YES, I DO',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'NO, I WANT TO MOVE IT',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q09'
        }],
        help: [`If you want to keep the boiler in the same place, we’ll plan the installation around its current location. If not, you can provide details about your preferred new location in the next step.`]
    },
    // Note: Fetch options from database
    BOILER_Q09: {
        id: "BOILER_Q09",
        content: 'Where would you like the boiler to be installed?',
        fieldName: "newBoilerLocate",
        answers: [{
            content: 'TO ANOTHER FLOOR/LOFT',
            icon: QUESTIONNAIRE_IMAGES.TO_ANOTHER_FLOOR,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'ANOTHER ROOM ON SAME FLOOR',
            icon: QUESTIONNAIRE_IMAGES.ANOTHER_ROOM_SAME_FLOOR,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'NEW PLACE WITHIN SAME ROOM',
            icon: QUESTIONNAIRE_IMAGES.NEW_PLACE_WITHIN_SAME_ROOM,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'IN THE AIRING CUPBOARD',
            icon: QUESTIONNAIRE_IMAGES.AIRING_CUPBOARD,
            nextNode: 'BOILER_Q10'
        }],
        help: [`If you’d like the boiler installed in a different location, please let us know so we can plan the work correctly.`]
    },
    BOILER_Q10: {
        id: "BOILER_Q10",
        content: 'What type of property do you live in?',
        fieldName: "propertyType",
        answers: [{
            content: 'A HOUSE',
            icon: QUESTIONNAIRE_IMAGES.DETACHED_HOUSE,
            value: "house",
            nextNode: 'BOILER_Q12'
        }, {
            content: 'A BUNGALOW',
            icon: QUESTIONNAIRE_IMAGES.BUNGALOW,
            value: "bungalow",
            nextNode: 'BOILER_Q13'
        }, {
            content: 'FLAT/APARTMENT',
            icon: QUESTIONNAIRE_IMAGES.FLAT,
            value: "flat",
            nextNode: 'BOILER_Q11'
        }]
    },
    BOILER_Q11: {
        id: "BOILER_Q11",
        content: 'Is your flat/appartment on the second floor or above?',
        fieldName: "isOnSecondFloor",
        answers: [{
            content: 'YES, IT IS',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q22'
        }, {
            content: 'NO, IT ISN’T',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q20'
        }]
    },
    BOILER_Q12: {
        id: "BOILER_Q12",
        content: 'How many bathrooms are in your home?',
        fieldName: "numOfBathrooms",
        answers: [{
            content: '1 BATHROOM',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_1,
            nextNode: 'BOILER_Q13'
        }, {
            content: '2 BATHROOMS',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_2,
            nextNode: 'BOILER_Q13'
        }, {
            content: '3 BATHROOMS',
            value: 3,
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_3,
            nextNode: 'BOILER_Q13'
        }, {
            content: '4+ BATHROOMS',
            value: 4,
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_4_PLUS,
            nextNode: 'BOILER_END'
        }]
    },
    
    BOILER_Q14: {
        id: "BOILER_Q14",
        content: 'Does your boiler’s flue exit through the wall?',
        fieldName: "isFlueOutOfWall",
        answers: [{
            content: 'YES, IT DOES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q16'
        }, {
            content: `NO, IT DOESN’T`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q15'
        }],
        help: [`Check outside the wall where your boiler is — if you see a pipe coming out, the flue exits through the wall.`],
        info: { title: "How to check", content: "Not sure? Look at the wall directly behind your boiler from outside — you're looking for a short white or grey pipe sticking out. If you can't tell or the pipe is hard to find, give us a call on", phone: "03335770017", image: QUESTIONNAIRE_IMAGES.EXTERIOR_WALL_OF_HOUSE }
    },
    BOILER_Q15: {
        id: "BOILER_Q15",
        content: 'Okay, does your boiler’s flue exit through the roof?',
        fieldName: "isFlueOutOfRoof",
        answers: [{
            content: 'YES, IT DOES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q17'
        }, {
            content: `NO, IT DOESN’T`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q16'
        }],
        help: [`Look at your roof above where the boiler is — if you see a pipe coming out, the flue exits through the roof`],
        info: { title: "How to check", content: "Vertical flues are less common and usually found on older or back-boiler setups. If you're not sure, or there's no access to check, call us and we'll help you figure it out on", phone: "03335770017" }
    },
    BOILER_Q16: {
        id: "BOILER_Q16",
        content: 'Is the flue more than 30 cm away from a window or door that opens?',
        fieldName: "isFlue30cmAwayFromDoor",
        answers: [{
            content: 'YES, IT IS',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q17'
        }, {
            content: `NO, IT ISN’T`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_Q17'
        }],
        explanation: {
            label: "Flue Length Explained",
            content: EXPLANATION_CONTENT.FUEL_TYPE_LIST
        },
        info: { title: "Why this matters", content: "Building regulations require the flue to be at least 30 cm from any opening window, door, or air vent to prevent fumes re-entering. If you're unsure, measure from the flue tip to the nearest opening — or call us on", phone: "03335770017" }
    },
    BOILER_Q17: {
        id: "BOILER_Q17",
        content: 'Do you have a water meter in your home?',
        fieldName: "hasWaterMeter",
        answers: [{
            content: 'Yes, It does',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: "BOILER_POSTCODE"
        }, {
            content: `No, It doesn’t`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: "BOILER_POSTCODE"
        }],
        help: [`A water meter is usually a small device with a dial or digital display, often found outside near the boundary of your property, under a cover in the pavement, or sometimes inside under the kitchen sink.`],
        info: { title: "How to find it", content: "Not sure? Check your latest water bill — it will say whether you're metered. If you still can't tell, it's fine to guess; this only affects your hot water flow rate estimate." }
    },
    BOILER_Q19: {
        id: "BOILER_Q19",
        content: 'Where would you prefer your new boiler to be installed?',
        fieldName: "newBoilerLocate",
        answers: [{
            content: 'IN THE AIRING CUPBOARD',
            icon: QUESTIONNAIRE_IMAGES.AIRING_CUPBOARD,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'NEW PLACE WITHIN SAME ROOM',
            icon: QUESTIONNAIRE_IMAGES.NEW_PLACE_WITHIN_SAME_ROOM,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'ANOTHER ROOM ON SAME FLOOR',
            icon: QUESTIONNAIRE_IMAGES.ANOTHER_ROOM_SAME_FLOOR,
            nextNode: 'BOILER_Q10'
        }, {
            content: 'TO ANOTHER FLOOR/LOFT',
            icon: QUESTIONNAIRE_IMAGES.TO_ANOTHER_FLOOR,
            nextNode: 'BOILER_Q10'
        }]
    },
    BOILER_Q13: {
        id: "BOILER_Q13",
        content: 'How many bedrooms are in your home?',
        fieldName: "numOfBedrooms",
        _comment: 'Next Node: Does your home have a water meter?',
        answers: [{
            content: '1 BEDROOM',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_1,
            nextNode: 'BOILER_Q17'
        }, {
            content: '2 BEDROOMS',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_2,
            nextNode: 'BOILER_Q17'
        }, {
            content: '3 BEDROOMS',
            value: 3,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_3,
            nextNode: 'BOILER_Q17'
        }, {
            content: '4+ BEDROOMS',
            value: 4,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_4_PLUS,
            nextNode: 'BOILER_Q17'
        }]
    },
    BOILER_Q20: {
        id: "BOILER_Q20",
        content: 'How many bedrooms are in your home?',
        fieldName: "numOfBedrooms",
        _comment: 'Next Node: How many radiators does your home have?',
        answers: [{
            content: '1 BEDROOM',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_1,
            nextNode: 'BOILER_Q21'
        }, {
            content: '2 BEDROOMS',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_2,
            nextNode: 'BOILER_Q21'
        }, {
            content: '3 BEDROOMS',
            value: 3,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_3,
            nextNode: 'BOILER_Q21'
        }, {
            content: '4+ BEDROOMS',
            value: 4,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_4_PLUS,
            nextNode: 'BOILER_Q21'
        }]
    },
    BOILER_Q23: {
        id: "BOILER_Q23",
        content: 'How many bedrooms are in your home?',
        fieldName: "numOfBedrooms",
        _comment: 'Next Node: Does your boiler’s flue go out of the wall?',
        answers: [{
            content: '1 BEDROOM',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_1,
            nextNode: 'BOILER_Q14'
        }, {
            content: '2 BEDROOMS',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_2,
            nextNode: 'BOILER_Q14'
        }, {
            content: '3 BEDROOMS',
            value: 3,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_3,
            nextNode: 'BOILER_Q14'
        }, {
            content: '4+ BEDROOMS',
            value: 4,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_4_PLUS,
            nextNode: 'BOILER_Q14'
        }]
    },
    BOILER_Q21: {
        id: "BOILER_Q21",
        content: 'How many radiators does your home have?',
        fieldName: "numOfRadiators",
        answers: [{
            content: '(0-5)',
            value: 5,
            icon: QUESTIONNAIRE_IMAGES.ZERO_TO_5,
            nextNode: 'BOILER_Q14'
        }, {
            content: '(6-9)',
            icon: QUESTIONNAIRE_IMAGES.SIX_TO_9,
            value: 9,
            nextNode: 'BOILER_Q14'
        }, {
            content: '(10-13)',
            value: 13,
            icon: QUESTIONNAIRE_IMAGES.TEN_TO_13,
            nextNode: 'BOILER_Q14'
        }, {
            content: '(14-16)',
            value: 16,
            icon: QUESTIONNAIRE_IMAGES.FOURTEEN_TO_16,
            nextNode: 'BOILER_Q14'
        }, {
            content: '(17+)',
            value: 17,
            icon: QUESTIONNAIRE_IMAGES.SEVENTEEN_PLUS,
            nextNode: 'BOILER_Q14'
        }],
        info: { title: "Counting your radiators", content: "Include all radiators throughout the home — bedrooms, bathrooms, hallways, and any rooms you rarely use. An approximate count is fine if you can't check every room right now." }
    },
    BOILER_Q22: {
        id: "BOILER_Q22",
        content: 'Is the boiler’s flue reachable from the outside?',
        fieldName: "isFlueAcessibleFromOutside",
        answers: [{
            content: 'YES, IT IS.',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'BOILER_Q20'
        }, {
            content: `No, it doesn't.`,
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'BOILER_END'
        }],
        help: [`To check your flue, look outside your home: if you see a pipe coming out of the wall where your boiler is, that’s a horizontal flue. If it comes out of the roof (or another part of the building like a garage), that’s a vertical flue.`],
        info: { title: "What accessible means", content: "Access means a gas engineer can reach the flue tip from outside without needing a scaffold or cherry picker. If the flue is above a flat roof or a conservatory, it may still count as accessible. Not sure? Call us on", phone: "03335770017", image: QUESTIONNAIRE_IMAGES.EXTERIOR_WALL_OF_HOUSE }
    },
    BOILER_END: {
        id: "BOILER_END",
        content: `Sorry!\nLooks like this one's a bit beyond our scope.`,
        exit: true,
        answers: [{
            content: "Give me a callback",
            nextNode: ACTIONS.CALLBACK
        }, {
            content: "Call us 0333 577 0017",
            nextNode: ACTIONS.CALL_US,
            phoneNumber: "03335770017"
        }]
    },
    BOILER_POSTCODE: {
            id: "BOILER_POSTCODE",
            icon: QUESTIONNAIRE_IMAGES.ENTER_POSTCODE,
            content: `What's your postcode?`,
            help: ["Almost there! Enter the postcode of the property where you would like us to install your new boiler."],
            type: ANSWER_TYPES.POSTCODE,
            fieldName: "postcode",
            nextButton: "Show Me Boilers",
            answers: [{
                content: "Show Me Boilers",
                answerProps: { label: "", placeholder: "W1W 7LT" },
                nextNode: ACTIONS.SHOW_RESULSTS
            }]
        }
};

