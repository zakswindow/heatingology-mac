import { ACTIONS, ANSWER_TYPES, TQuestions } from "../../_types";
import { QUESTIONNAIRE_IMAGES } from "../../ImageIcon";
import { Product } from "@prisma/client";
import { QUESTIONNAIRE_IMAGES_DB_ENUM } from "../../ImageIcon/enum";

export const EV_CHARGER_START_NODE = "EV_Q01";

export const EV_CHARGER_QUESTIONS: TQuestions = {
    "EV_Q01": {
        id: "EV_Q01",
        content: "First up, do you have your own driveway/ off street parking?",
        fieldName: "ownDriveWay",
        answers: [{
            content: "Yes, I do.",
            icon: QUESTIONNAIRE_IMAGES.YES,
            value: true,
            nextNode: "EV_Q02"
        }, {
            content: "No, I don't.",
            icon: QUESTIONNAIRE_IMAGES.NO,
            value: false,
            nextNode: "EV_END"
        }]
    },
    "EV_Q02": {
        id: "EV_Q02",
        content: "Cool, and where do you want your charger to be located?",
        fieldName: "whereYourChargerTobe",
        answers: [{
            content: "EXTERIOR WALL OF MY HOUSE",
            icon: QUESTIONNAIRE_IMAGES.EXTERIOR_WALL_OF_HOUSE,
            nextNode: "EV_Q03"
        }, {
            content: "ATTACHED GARAGE",
            icon: QUESTIONNAIRE_IMAGES.ATTACHED_GARAGE,
            nextNode: "EV_Q03"
        }, {
            content: "DETACHED GARAGE/ OUTBUILDING",
            icon: QUESTIONNAIRE_IMAGES.DETACHED_GARAGE,
            nextNode: "EV_END"
        }, {
            content: "ON A POST ON MY DRIVEWAY",
            icon: QUESTIONNAIRE_IMAGES.ON_A_POST_ON_MY_DRIVEWAY,
            nextNode: "EV_END"
        }]
    },
    "EV_Q03": {
        id: "EV_Q03",
        content: "Where is your homes’s meter/fuse box located?",
        fieldName: "whereYourMeterIs",
        answers: [{
            content: "Inside my hourse",
            icon: QUESTIONNAIRE_IMAGES.FUSE_HOUSE,
            nextNode: "EV_Q04"
        }, {
            content: "OUTSIDE, IN A METER BOX",
            icon: QUESTIONNAIRE_IMAGES.FUSE_METERBOX,
            nextNode: "EV_Q04"
        }, {
            content: "IN MY ATTACHED GARAGE",
            icon: QUESTIONNAIRE_IMAGES.ATTACHED_GARAGE,
            nextNode: "EV_Q04"
        }, {
            content: "IN MY DETACHED GARAGE",
            icon: QUESTIONNAIRE_IMAGES.DETACHED_GARAGE,
            nextNode: "EV_END"
        }]
    },
    "EV_Q04": {
        id: "EV_Q04",
        content: "How far will the charger be from your electricity meter, roughly?",
        fieldName: "fromChargerToMeter",
        answers: [{
            content: "Up to 5 meters",
            icon: QUESTIONNAIRE_IMAGES.ZERO_TO_5,
            nextNode: ACTIONS.BOOKING
        }, {
            content: "6-10 meters",
            icon: QUESTIONNAIRE_IMAGES.SIX_TO_10,
            nextNode: ACTIONS.BOOKING
        }, {
            content: "11-15 meters",
            icon: QUESTIONNAIRE_IMAGES.ELEVEN_TO_15,
            nextNode: ACTIONS.BOOKING
        }, {
            content: "16+ meters",
            icon: QUESTIONNAIRE_IMAGES.SIXTEEN,
            nextNode: "EV_END"
        }]
    },
    "EV_END": {
        id: "EV_END",
        content: "Time to talk?",
        help: ["Based on what you’ve said, we’ll need to check some details through before being able to quote."],
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
    EV_CHARGER_POSTCODE: {
        id: "EV_CHARGER_POSTCODE",
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


export function getEvChargerQuestions (evChargerExtra: Product[]) {
    const nextNodeMap = {
        [QUESTIONNAIRE_IMAGES_DB_ENUM.ZERO_TO_5]: "EV_CHARGER_POSTCODE",
        [QUESTIONNAIRE_IMAGES_DB_ENUM.SIX_TO_10]: "EV_CHARGER_POSTCODE",
        [QUESTIONNAIRE_IMAGES_DB_ENUM.ELEVEN_TO_15]: "EV_CHARGER_POSTCODE",
        [QUESTIONNAIRE_IMAGES_DB_ENUM.SIXTEEN]: "EV_END"
    };

    if (evChargerExtra && evChargerExtra.length > 0) {
        EV_CHARGER_QUESTIONS["EV_Q04"] = {
            ...EV_CHARGER_QUESTIONS["EV_Q04"],
            answers: evChargerExtra.map((item: Product) => ({
                content: item.model,
                nextNode: nextNodeMap[item.productImage],
                priceTag: item.price,
                value: item.id,
                icon: item.productImage
            }))
        };
    }
    return EV_CHARGER_QUESTIONS;
}