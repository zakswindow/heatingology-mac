import { Product, ProductType } from "@prisma/client";
import { BOILER_START_NODE } from "./Questionnaire/configs/boiler/config";
import { getBoilerQuestions } from "./Questionnaire/_helpers";
import { BOILER_REPAIR_QUESTIONS, BOILER_REPAIR_START_NODE } from "./Questionnaire/configs/boilerRepair/config";
import { BOILER_SERVICE_QUESTIONS, BOILER_SERVICE_START_NODE } from "./Questionnaire/configs/boilerService/config";
import { EV_CHARGER_START_NODE, getEvChargerQuestions } from "./Questionnaire/configs/evCharger/config";
import { HEAT_PUMP_QUESTIONS, HEAT_PUMP_START_NODE } from "./Questionnaire/configs/heatpump/config";

export function useGetQuestions (service: ProductType, boilerExtra: Product[], evChargerExtra: Product[]) {
    const boilerQuestions = getBoilerQuestions(boilerExtra);
    const evChargerQuestions = getEvChargerQuestions(evChargerExtra);

    switch (service) {
        case ProductType.boiler:
            return {
                questions: boilerQuestions,
                startNode: BOILER_START_NODE
            };
        case ProductType.boiler_repair:
            return {
                questions: BOILER_REPAIR_QUESTIONS,
                startNode: BOILER_REPAIR_START_NODE
            };
        case ProductType.boiler_service:
            return {
                questions: BOILER_SERVICE_QUESTIONS,
                startNode: BOILER_SERVICE_START_NODE
            };
        case ProductType.ev_charger:
            return {
                questions: evChargerQuestions,
                startNode: EV_CHARGER_START_NODE
            };
        case ProductType.heatPump:
            return {
                questions: HEAT_PUMP_QUESTIONS,
                startNode: HEAT_PUMP_START_NODE
            };
        default:
            return {};
        
    };
}

export function parseCreateScreenContent ({ content, service, products = [] }: { content: Record<string, unknown>; service: string; products?: { id: string }[] }) {
    const body: Record<string, unknown> = {
        content,
        productType: service
    };

    const postcode = content.postcode as { inputValue?: string } | undefined;
    if (postcode?.inputValue) {
        body.postcode = postcode.inputValue;
    }

    if (products.length > 0) {
        body.products = { connect: products };
    }

    return body;
}