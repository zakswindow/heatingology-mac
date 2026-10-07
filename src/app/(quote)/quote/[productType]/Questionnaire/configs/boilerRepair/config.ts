import { LOGOS } from "@/lib/_imageMap";
import { ACTIONS, ANSWER_TYPES, TQuestions } from "../../_types";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";

export const BOILER_REPAIR_START_NODE = "BOILER_R_Q01";

export const BOILER_REPAIR_QUESTIONS: TQuestions = {
    BOILER_R_Q01: {
        id: "BOILER_R_Q01",
        content: "What kind of fuel does your boiler use?",
        fieldName: "boilerFuelType",
        answers: [{
            content: "GAS",
            icon: QUESTIONNAIRE_IMAGES.MAIN_GAS,
            nextNode: "BOILER_R_Q02"
        }, {
            content: "LPG",
            icon: QUESTIONNAIRE_IMAGES.LPG,
            nextNode: "BOILER_R_Q02"
        }]
    },
    BOILER_R_Q02: {
        id: "BOILER_R_Q02",
        content: "What type of boiler do you have?",
        fieldName: "boilerType",
        answers: [{
            content: 'SYSTEM BOILER',
            icon: QUESTIONNAIRE_IMAGES.SYSTEM_BOILER,
            nextNode: 'BOILER_R_Q03'
        }, {
            content: 'REGULAR/ STANDARD BOILER',
            icon: QUESTIONNAIRE_IMAGES.STANDARD_BOILER,
            nextNode: 'BOILER_R_Q03'
        }, {
            content: 'COMBI BOILER',
            icon: QUESTIONNAIRE_IMAGES.COMBI_BOILER,
            nextNode: 'BOILER_R_Q03'
        }, {
            content: 'BACK BOILER',
            icon: QUESTIONNAIRE_IMAGES.BACK_BOILER,
            nextNode: 'BOILER_R_Q03'
        }]
    },
    BOILER_R_Q03: {
        id: "BOILER_R_Q03",
        content: "What make is your boiler?",
        fieldName: "boilerBrand",
        searchable: true,
        answers: [{
            content: "",
            searchLabel: "Worcester",
            icon: QUESTIONNAIRE_IMAGES.LOGO_WORECESTER,
            nextNode: "BOILER_R_Q04"
        }, {
            content: "",
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: "BOILER_R_Q04"
        }, {
            content: "",
            searchLabel: "Vaillant",
            icon: QUESTIONNAIRE_IMAGES.LOGO_VAILLANT,
            nextNode: "BOILER_R_Q04"
        }, {
            content: "",
            searchLabel: "Baxi",
            icon: QUESTIONNAIRE_IMAGES.LOGO_BAXI,
            nextNode: "BOILER_R_Q04"
        }, {
            content: "",
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: "BOILER_R_Q04"
        }, {
            content: "I DON'T KNOW / NOT IN THE LIST",
            searchLabel: "?",
            icon: QUESTIONNAIRE_IMAGES.SOMETHING_ELSE,
            nextNode: "BOILER_R_Q04"
        }]
    },
    BOILER_R_Q04: {
        id: "BOILER_R_Q04",
        content: "Which of these are not working in your home?",
        fieldName: "notWorking",
        answers: [{
            content: "HEATING",
            icon: QUESTIONNAIRE_IMAGES.HEATING,
            nextNode: "BOILER_R_Q05"
        }, {
            content: "HOT WATER",
            icon: QUESTIONNAIRE_IMAGES.HOT_WATER,
            nextNode: "BOILER_R_Q05"
        }, {
            content: "HEATING & HOT WATER",
            icon: QUESTIONNAIRE_IMAGES.HEATING_HOT_WATER,
            nextNode: "BOILER_R_Q05"
        }, {
            content: "SOMETHING ELSE",
            icon: QUESTIONNAIRE_IMAGES.SOMETHING_ELSE,
            nextNode: "BOILER_R_Q06"
        }]
    },
    BOILER_R_Q05: {
        id: "BOILER_R_Q05",
        content: "Has the pressure on your boiler dropped?",
        fieldName: "hasPressureDropped",
        answers: [{
            content: "YES",
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: "BOILER_R_Q07"
        }, {
            content: "NO",
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: "BOILER_R_Q07"
        }, {
            content: "I don't know",
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: "BOILER_R_Q07"
        }]
    },
    BOILER_R_Q06: {
        id: "BOILER_R_Q06",
        content: "What seems to be the problem?",
        fieldName: "problem",
        type: ANSWER_TYPES.TEXT_INPUT,
        nextButton: "Continue",
        answers: [{
            answerProps: { label: "Enter your problem here" },
            nextNode: 'BOILER_R_Q05'
        }]
    },
    BOILER_R_Q07: {
        id: "BOILER_R_Q07",
        content: "Roughly, how old is your boiler?",
        fieldName: "ageOfBoiler",
        answers: [{
            content: "UPTO 2 YEARS",
            icon: QUESTIONNAIRE_IMAGES.UP_TO_2,
            nextNode: "BOILER_R_Q08"
        }, {
            content: "2-5 YEARS",
            icon: QUESTIONNAIRE_IMAGES.TWO_TO_5,
            nextNode: "BOILER_R_Q08"
        }, {
            content: "5-10 YEARS",
            icon: QUESTIONNAIRE_IMAGES.FIVE_TO_10,
            nextNode: "BOILER_R_Q08"
        }, {
            content: "OVER 10 YEARS",
            icon: QUESTIONNAIRE_IMAGES.TEN_PLUS,
            nextNode: "BOILER_R_Q08"
        }, {
            content: "I don't know",
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: "BOILER_R_Q08"
        }]
    },
    BOILER_R_Q08: {
        id: "BOILER_R_Q08",
        content: "Where is your boiler located?",
        fieldName: "boilerLocation",
        answers: [{
            content: "UTILITY ROOM",
            icon: QUESTIONNAIRE_IMAGES.UTILITY_ROOM,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "KITCHEN",
            icon: QUESTIONNAIRE_IMAGES.KITCHEN,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "GARAGE",
            icon: QUESTIONNAIRE_IMAGES.GARAGE,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "AIRING CUPBOARD",
            icon: QUESTIONNAIRE_IMAGES.AIRING_CUPBOARD,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "BEDROOM",
            icon: QUESTIONNAIRE_IMAGES.BEDROOM,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "LOFT OR ATTIC",
            icon: QUESTIONNAIRE_IMAGES.LOFT_OR_ATTIC,
            nextNode: "BOILER_R_Q10"
        }, {
            content: "SOMEWHERE ELSE",
            icon: QUESTIONNAIRE_IMAGES.SOMETHING_ELSE,
            nextNode: "BOILER_R_Q09"
        }]
    },
    BOILER_R_Q09: {
        id: "BOILER_R_Q09",
        content: "Where is your boiler located?",
        fieldName: "boilerLocation",
        type: ANSWER_TYPES.TEXT_INPUT,
        nextButton: "Continue",
        answers: [{
            answerProps: { label: "Enter location" },
            nextNode: "BOILER_R_Q10"
        }]
    },
    BOILER_R_Q10: {
        id: "BOILER_R_Q10",
        content: "Is there a fault code, message or signal showing on your boiler or thermostat?",
        type: ANSWER_TYPES.TEXT_INPUT,
        fieldName: "faultCode",
        nextButton: "Next",
        answers: [{
            content: "Next",
            answerProps: { label: "Provide the fault code or describe the signal shown" },
            nextNode: "BOILER_R_POSTCODE"
        }]
    },
    BOILER_R_POSTCODE: {
        id: "BOILER_R_POSTCODE",
        icon: QUESTIONNAIRE_IMAGES.ENTER_POSTCODE,
        content: `What's your postcode?`,
        help: ["Almost there! To calculate the most accurate quote, we just need your postcode to check local availability."],
        type: ANSWER_TYPES.POSTCODE,
        fieldName: "postcode",
        nextButton: "Show results",
        answers: [{
            content: "Show results",
            answerProps: { label: "" },
            nextNode: ACTIONS.SHOW_RESULSTS
        }]
    }
};