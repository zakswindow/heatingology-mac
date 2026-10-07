import { TAccordionData } from ".";

type TGetDefaultValue = {
    enabled: boolean;
    accordionItem: TAccordionData[];
    accordionType: "single" | "multiple";
}
export function getDefaultValue ({ enabled, accordionItem, accordionType }: TGetDefaultValue) {
    if (!enabled || accordionItem.length <= 0) {
        return;
    }

    if (accordionType === "multiple") {
        return [accordionItem[0].value];
    }

    if (accordionType === "single") {
        return accordionItem[0].value;
    }
}

export function getBasicRootProps ({ enabled, value, onValueChange, accordionType}) {
    const props = {};

    if (!enabled) {
        return props;
    }

    if (value) {
        props.value = value;
        props.onValueChange = onValueChange;
    }

    if (accordionType === "single") {
        props.collapsible = true;
    }

    return props;
}