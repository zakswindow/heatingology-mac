import { ACTIONS, ANSWER_TYPES, TQuestions } from "../../_types";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";

export const BOILER_SERVICE_START_NODE = "BOILER_S_Q01";

export const BOILER_SERVICE_QUESTIONS: TQuestions = {
    "BOILER_S_Q01": {
        id: "BOILER_S_Q01",
        content: "Is your boiler on mains gas?",
        fieldName: "runOnGas",
        answers: [{
            content: "Yes",
            value: true,
            icon: QUESTIONNAIRE_IMAGES.YES,
            nextNode: "BOILER_S_Q02"
        }, {
            content: "No",
            value: false,
            icon: QUESTIONNAIRE_IMAGES.NO,
            nextNode: "BOILER_S_END"
        }],
        help: ["Not sure? Check your energy bill or look for a gas meter in your home."],
        info: {
            content: "Most UK homes run on mains gas but we want to make sure we find you the right boiler. If you are unsure, please call us on",
            phone: "03335770017"
        }
    },
    "BOILER_S_Q02": {
        id: "BOILER_S_Q02",
        content: "How old is the boiler which needs servicing?",
        fieldName: "ageOfBoiler",
        answers: [{
            content: "0-10 YEARS",
            icon: QUESTIONNAIRE_IMAGES.Y_0_10,
            nextNode: "BOILER_S_POSTCODE"
        }, {
            content: "10-20 YEARS",
            icon: QUESTIONNAIRE_IMAGES.Y_10_20,
            nextNode: "BOILER_S_POSTCODE"
        }, {
            content: "20-25 YEARS",
            icon: QUESTIONNAIRE_IMAGES.Y_20_25,
            nextNode: "BOILER_S_POSTCODE"
        }, {
            content: "25+ YEARS",
            icon: QUESTIONNAIRE_IMAGES.Y_25_PLUS,
            nextNode: "BOILER_S_POSTCODE"
        }, {
            content: "UNSURE",
            icon: QUESTIONNAIRE_IMAGES.UNKNONN,
            nextNode: "BOILER_S_POSTCODE"
        }]
    },
    "BOILER_S_POSTCODE": {
        id: "BOILER_S_POSTCODE",
        icon: QUESTIONNAIRE_IMAGES.ENTER_POSTCODE,
        content: `What's your postcode?`,
        nextButton: "Show Results",
        help: ["Almost there! To calculate the most accurate quote, we just need your postcode to check local availability."],
        fieldName: "postcode",
        type: ANSWER_TYPES.POSTCODE,
        answers: [{
            answerProps: { label: "" },
            nextNode: ACTIONS.SHOW_RESULSTS
        }]
    },
    "BOILER_S_END": {
        id: "BOILER_S_END",
        content: `Sorry!\nLooks like this one's a bit beyond our scope.`,
        exit: true,
        help: ["Unfortunately, we cannot help with that type of property or heating system right now."],
        answers: [{
            content: "Give me a callback",
            nextNode: ACTIONS.CALLBACK
        }, {
            content: "Call us 0333 577 0017",
            nextNode: ACTIONS.CALL_US,
            phoneNumber: "03335770017"
        }]
    }
};