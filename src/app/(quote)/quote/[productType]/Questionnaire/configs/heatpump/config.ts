import { BoilerType, FuelType } from "@prisma/client";
import { ACTIONS, ANSWER_TYPES, TQuestions } from "../../_types";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";

export const HEAT_PUMP_START_NODE = "HEAT_PUMP_Q01";

export const HEAT_PUMP_QUESTIONS: TQuestions = {
    HEAT_PUMP_Q01: {
        id: "HEAT_PUMP_Q01",
        content: 'Are you a homeowner or a landlord?',
        fieldName: "isLandlord",
        answers: [{
            content: 'HOMEOWNER',
            icon: QUESTIONNAIRE_IMAGES.HOMEOWNER,
            value: false,
            nextNode: 'HEAT_PUMP_Q02'
        }, {
            content: 'LANDLORD',
            icon: QUESTIONNAIRE_IMAGES.LANDLORD,
            value: true,
            nextNode: 'HEAT_PUMP_Q02'
        }]
    },
    HEAT_PUMP_Q02: {
        id: "HEAT_PUMP_Q02",
        content: 'What does your current heating system use?',
        fieldName: "heatingFuel",
        answers: [{
            content: 'GAS',
            value:  FuelType.GAS,
            icon: QUESTIONNAIRE_IMAGES.MAIN_GAS,
            nextNode: 'HEAT_PUMP_Q04'
        }, {
            content: 'LPG',
            icon: QUESTIONNAIRE_IMAGES.LPG,
            value: FuelType.LPG,
            nextNode: 'HEAT_PUMP_Q04'
        }, {
            content: 'OIL',
            icon: QUESTIONNAIRE_IMAGES.OIL_BOILER,
            value: FuelType.OIL,
            nextNode: 'HEAT_PUMP_Q04'
        }, {
            content: 'ELECTRIC',
            icon: QUESTIONNAIRE_IMAGES.ELECTRIC_BOILER,
            value: FuelType.ELECTRIC,
            nextNode: 'HEAT_PUMP_Q03'
        }]
    },
    HEAT_PUMP_Q03: {
        id: "HEAT_PUMP_Q03",
        content: 'Currently, what type of electric heating system do you have?',
        fieldName: "heatingType",
        answers: [{
            content: 'Air source heat pump',
            icon: QUESTIONNAIRE_IMAGES.AIR_SOURCE_HEAT_PUMP,
            nextNode: 'HEAT_PUMP_CALLBACK'
        }, {
            content: 'Ground source heat pump',
            icon: QUESTIONNAIRE_IMAGES.GROUND_SOURCE_HEAT_PUMP,
            nextNode: 'HEAT_PUMP_CALLBACK'
        }, {
            content: 'Electric radiators',
            icon: QUESTIONNAIRE_IMAGES.ELECTRIC_RADIATORS,
            nextNode: 'HEAT_PUMP_CALLBACK'
        }, {
            content: 'Electric boiler',
            icon: QUESTIONNAIRE_IMAGES.ELECTRIC_BOILER,
            nextNode: 'HEAT_PUMP_CALLBACK'
        }] 
    },
    HEAT_PUMP_Q04: {
        id: "HEAT_PUMP_Q04",
        content: 'What type of boiler do you have?',
        fieldName: "boilerType",
        answers: [{
            content: 'COMBI',
            value: BoilerType.COMBI,
            icon: QUESTIONNAIRE_IMAGES.COMBI_BOILER,
            nextNode: 'HEAT_PUMP_Q05'
        }, {
            content: 'STANDARD',
            value: BoilerType.STANDARD,
            icon: QUESTIONNAIRE_IMAGES.STANDARD_BOILER,
            nextNode: 'HEAT_PUMP_Q06'
        }, {
            content: 'SYSTEM',
            value: BoilerType.SYSTEM,
            icon: QUESTIONNAIRE_IMAGES.SYSTEM_BOILER,
            nextNode: 'HEAT_PUMP_Q06'
        }, {
            content: 'BACK BOILER',
            value: BoilerType.BACK,
            icon: QUESTIONNAIRE_IMAGES.BACK_BOILER,
            nextNode: 'HEAT_PUMP_Q06'
        }]
    },
    HEAT_PUMP_Q05: {
        id: "HEAT_PUMP_Q05",
        content: 'Do you have room for a water cylinder?',
        fieldName: "roomHasWaterCylinder",
        answers: [{
            content: 'YES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'HEAT_PUMP_Q06'
        }, {
            content: 'NO',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q06: {
        id: "HEAT_PUMP_Q06",
        content: 'How quickly does your water come out of your cold tap?',
        fieldName: "coldTapSpeed",
        answers: [{
            content: 'FAST',
            icon: QUESTIONNAIRE_IMAGES.FAST_FLOW,
            nextNode: 'HEAT_PUMP_Q07'
        }, {
            content: 'AVERAGE',
            icon: QUESTIONNAIRE_IMAGES.AVERAGE_FLOW,
            nextNode: 'HEAT_PUMP_Q07'
        }, {
            content: 'SLOW',
            icon: QUESTIONNAIRE_IMAGES.SLOW_FLOW,
            nextNode: 'HEAT_PUMP_Q07'
        }]
    },
    HEAT_PUMP_Q07: {
        id: "HEAT_PUMP_Q07",
        content: 'Roughly, how old is your boiler?',
        fieldName: "ageOfBoiler",
        answers: [{
            content: '(0-17) UPTO 17 YEARS',
            icon: QUESTIONNAIRE_IMAGES.UP_TO_17,
            nextNode: 'HEAT_PUMP_Q08'
        }, {
            content: '(18-30) 18-30 YEARS',
            icon: QUESTIONNAIRE_IMAGES.EIGHTEEN_TO_30,
            nextNode: 'HEAT_PUMP_Q08'
        }, {
            content: '(31+) 31+ YEARS ',
            icon: QUESTIONNAIRE_IMAGES.THIRTY_ONE_PLUS,
            nextNode: 'HEAT_PUMP_Q08'
        }]
    },
    HEAT_PUMP_Q08: {
        id: "HEAT_PUMP_Q08",
        content: 'Which of these best describes your home?',
        fieldName: "propertyType",
        answers: [{
            content: 'DETACHED',
            icon: QUESTIONNAIRE_IMAGES.DETACHED_HOUSE,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'SEMI DETACHED',
            icon: QUESTIONNAIRE_IMAGES.SEMI_DETACHED,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'TERRACE',
            icon: QUESTIONNAIRE_IMAGES.TERRACE,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'BUNGALOW',
            icon: QUESTIONNAIRE_IMAGES.BUNGALOW,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'FLAT',
            icon: QUESTIONNAIRE_IMAGES.FLAT,
            nextNode: 'HEAT_PUMP_Q10'
        }]
    },
    HEAT_PUMP_Q09: {
        id: "HEAT_PUMP_Q09",
        content: 'Do you have a valid Energy Performance Certificate (EPC)?',
        fieldName: "hasEPC",
        answers: [{
            content: 'YES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'HEAT_PUMP_Q13'
        }, {
            content: 'NO',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q10: {
        id: "HEAT_PUMP_Q10",
        content: 'Do you have permission to carry out work on your flat?',
        fieldName: "permitToWorkOnFlat",
        answers: [{
            content: 'YES',
            icon: QUESTIONNAIRE_IMAGES.YES,
            value: true,
            nextNode: 'HEAT_PUMP_Q11'
        }, {
            content: 'NO',
            icon: QUESTIONNAIRE_IMAGES.NO,
            value: false,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q11: {
        id: "HEAT_PUMP_Q11",
        content: 'Which floor is your flat on?',
        fieldName: "floor",
        answers: [{
            content: 'BASEMENT',
            icon: QUESTIONNAIRE_IMAGES.BASEMENT,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'GROUND FLOOR',
            icon: QUESTIONNAIRE_IMAGES.G_FLOOR,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: '1ST FLOOR',
            icon: QUESTIONNAIRE_IMAGES.FIRST,
            nextNode: 'HEAT_PUMP_Q12'
        }, {
            content: '2ND OR 3RD FLOOR',
            icon: QUESTIONNAIRE_IMAGES.SECOND_OR_THIRD,
            nextNode: 'HEAT_PUMP_END'
        }, {
            content: '4TH+ FLOOR',
            icon: QUESTIONNAIRE_IMAGES.FOURTH_PLUS,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q12: {
        id: "HEAT_PUMP_Q12",
        content: 'Do you own some outdoor grounds?',
        fieldName: "ownOutdoorGrounds",
        answers: [{
            content: 'YES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'HEAT_PUMP_Q09'
        }, {
            content: 'NO',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q13: {
        id: "HEAT_PUMP_Q13",
        content: 'Enter Certificate Number',
        fieldName: "certificateNumber",
        type: ANSWER_TYPES.TEXT_INPUT,
        nextButton: "Next",
        answers: [{ nextNode: 'HEAT_PUMP_Q14' }]
    },
    HEAT_PUMP_Q14: {
        id: "HEAT_PUMP_Q14",
        content: 'What size is your home in square metres?',
        fieldName: "sizeOfHome",
        type: ANSWER_TYPES.NUMBER_INPUT,
        nextButton: "Next",
        answers: [{
            answerProps: { tail: "m2" },
            nextNode: 'HEAT_PUMP_Q15'
        }]
    },
    HEAT_PUMP_Q15: {
        id: "HEAT_PUMP_Q15",
        content: 'How many KWH do you use heating your home annually?',
        fieldName: "heatingUsage",
        type: ANSWER_TYPES.NUMBER_INPUT,
        nextButton: "Next",
        answers: [{
            answerProps: { tail: "kwh" },
            // content: 'KWH PER YEAR FOR HEATING E.G 7,760',
            nextNode: 'HEAT_PUMP_Q16'
        }]
    },
    HEAT_PUMP_Q16: {
        id: "HEAT_PUMP_Q16",
        content: 'How many KWH do you use for hot water annually?',
        fieldName: "annualHotWaterKwh",
        nextButton: "Next",
        type: ANSWER_TYPES.NUMBER_INPUT,
        answers: [{
            answerProps: { tail: "kwh" },
            content: 'KWH PER YEAR FOR HOT WATER E.G 3,334',
            nextNode: 'HEAT_PUMP_Q17'
        }]
    },
    HEAT_PUMP_Q17: {
        id: "HEAT_PUMP_Q17",
        content: 'Roughly, when was your house built?',
        fieldName: "homeBuiltYear",
        answers: [{
            content: 'PRE 1900',
            icon: QUESTIONNAIRE_IMAGES.PRE_1900,
            nextNode: 'HEAT_PUMP_Q18'
        }, {
            content: '1900-1949',
            icon: QUESTIONNAIRE_IMAGES.Y_1900_1949,
            nextNode: 'HEAT_PUMP_Q18'
        }, {
            content: '1950-1975',
            icon: QUESTIONNAIRE_IMAGES.Y_1950_1975,
            nextNode: 'HEAT_PUMP_Q18'
        }, {
            content: '1976-2007',
            icon: QUESTIONNAIRE_IMAGES.Y_1976_2007,
            nextNode: 'HEAT_PUMP_Q18'
        }, {
            content: 'POST 2007',
            icon: QUESTIONNAIRE_IMAGES.POST_2007,
            nextNode: 'HEAT_PUMP_Q19'
        }]
    },
    HEAT_PUMP_Q18: {
        id: "HEAT_PUMP_Q18",
        content: 'Do you have cavity wall insulation?',
        fieldName: "hasCavityWallInsulation",
        answers: [{
            content: 'YES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'HEAT_PUMP_Q19'
        }, {
            content: 'NO',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_Q25'
        }, {
            content: `I don't know`,
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: 'HEAT_PUMP_Q25'
        }]
    },
    HEAT_PUMP_Q19: {
        id: "HEAT_PUMP_Q19",
        content: 'How many bedrooms do you have?',
        fieldName: "numOfBedrooms",
        answers: [{
            content: '1 BEDROOM',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_1,
            nextNode: 'HEAT_PUMP_Q20'
        }, {
            content: '2 BEDROOM',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_2,
            nextNode: 'HEAT_PUMP_Q20'
        }, {
            content: '3 BEDROOM',
            value: 3,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_3,
            nextNode: 'HEAT_PUMP_Q20'
        }, {
            content: '4 BEDROOM',
            value: 4,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_4,
            nextNode: 'HEAT_PUMP_Q20'
        }, {
            content: '5 BEDROOM',
            value: 5,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_5,
            nextNode: 'HEAT_PUMP_Q20'
        }, {
            content: '6+ BEDROOM',
            value: 6,
            icon: QUESTIONNAIRE_IMAGES.BEDROOM_6_PLUS,
            nextNode: 'HEAT_PUMP_Q20'
        }]
    },
    HEAT_PUMP_Q20: {
        id: "HEAT_PUMP_Q20",
        content: 'How many bathtubs do you have, or plan to have in the future?',
        fieldName: "numOfBathtubs",
        answers: [{
            content: '0 BATHTUBS',
            icon: QUESTIONNAIRE_IMAGES.NO,
            value: 0,
            nextNode: 'HEAT_PUMP_Q21'
        }, {
            content: '1 BATHTUB',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_1,
            nextNode: 'HEAT_PUMP_Q21'
        }, {
            content: '2 BATHTUBS',
            icon: QUESTIONNAIRE_IMAGES.BATHROOM_2,
            value: 2,
            nextNode: 'HEAT_PUMP_Q21'
        }, {
            content: '3+ BATHTUBS',
            icon: QUESTIONNAIRE_IMAGES.BATHTUB_3_PLUS,
            nextNode: 'HEAT_PUMP_Q21'
        }]
    },
    HEAT_PUMP_Q21: {
        id: "HEAT_PUMP_Q21",
        content: 'How many separate showers do you have, or plan to have in the future?',
        fieldName: "numOfShowers",
        answers: [{
            content: '0 SHOWERS',
            value: 0,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_Q22'
        }, {
            content: '1 SHOWER',
            value: 1,
            icon: QUESTIONNAIRE_IMAGES.SHOWER_1,
            nextNode: 'HEAT_PUMP_Q22'
        }, {
            content: '2+ SHOWERS',
            value: 2,
            icon: QUESTIONNAIRE_IMAGES.SHOWER_2_PLUS,
            nextNode: 'HEAT_PUMP_Q22'
        }]
    },
    HEAT_PUMP_Q22: {
        id: "HEAT_PUMP_Q22",
        content: 'How many radiators do you have?',
        fieldName: "numOfRadiators",
        type: ANSWER_TYPES.NUMBER_INPUT,
        nextButton: "Next",
        answers: [{
            content: 'NUMBER OF RADIATORS E.G 11',
            nextNode: 'HEAT_PUMP_Q23'
        }]
    },
    HEAT_PUMP_Q23: {
        id: "HEAT_PUMP_Q23",
        content: 'Do you have enough ground space for an outdoor unit?',
        fieldName: "hasSpaceForOutdoorUnit",
        answers: [{
            content: 'YES',
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: 'HEAT_PUMP_Q24'
        }, {
            content: 'NO',
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: 'HEAT_PUMP_END'
        }]
    },
    HEAT_PUMP_Q24: {
        id: "HEAT_PUMP_Q24",
        content: 'How much clearance is there?',
        fieldName: "sizeOfClearance",
        answers: [{
            content: 'MORE THAN 1.5 METRES',
            icon: QUESTIONNAIRE_IMAGES.GREATER_THAN_15M,
            nextNode: 'HEAT_PUMP_Q25'
        }, {
            content: 'LESS THAN 1.5 METRES',
            icon: QUESTIONNAIRE_IMAGES.LESS_THAN_15M,
            nextNode: 'HEAT_PUMP_Q19'
        }]
    },
    HEAT_PUMP_Q25: {
        id: "HEAT_PUMP_Q25",
        content: `Upload a photo of the outdoor space`,
        fieldName: "outdoorSpacePhoto",
        type: ANSWER_TYPES.IMAGE_UPLOAD,
        nextButton: "Next",
        help: [`Our team will review the photo to ensure there’s enough space. Don’t worry, you can skip this for now.`],
        answers: [{ nextNode: "HEAT_PUMP_Q26" }]
    },
    HEAT_PUMP_Q26: {
        id: "HEAT_PUMP_Q26",
        content: 'Please enter your postcode.',
        icon: QUESTIONNAIRE_IMAGES.ENTER_POSTCODE,
        fieldName: "postcode",
        type: ANSWER_TYPES.POSTCODE,
        nextButton: "Continue",
        answers: [{ nextNode: ACTIONS.SHOW_RESULSTS }]
    },

    HEAT_PUMP_CALLBACK: {
        id: "HEAT_PUMP_CALLBACK",
        content: 'Please fill out the form. We will call you back.',
        answers: [{
            content: "Give me a callback",
            nextNode: ACTIONS.CALLBACK
        }]
    },
    HEAT_PUMP_END: {
        id: "HEAT_PUMP_END",
        content: `Unfortunately, we can’t install a heat pump.`,
        nextButton: "Back to Home",
        answers: [{ nextNode: ACTIONS.GO_HOME }]
    }
};