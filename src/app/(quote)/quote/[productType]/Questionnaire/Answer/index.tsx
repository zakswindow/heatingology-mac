import TextInput from "@/components/Input/TextInput";
import { ACTIONS, ANSWER_TYPES, TQuestion } from "../_types";
import OptionTile from "./OptionTile";
import { TAnswer as TAnswerItem } from "../_types";
import { useState } from "react";
import styles from "./style.module.scss";
import AnswerTextInput from "./TextInput";
import ImageUpload from "./ImageUpload";
import ActionTile from "./ActionTile";

type TAnswer = {
    question: TQuestion;
    answer: Record<string, unknown>;
    // type?: ANSWER_TYPES;
    item: TAnswerItem;
    error?: string | null;
    onClick?: () => void;
    onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Answer ({
    question,
    answer = {},
    item, 
    error,
    onClick = () => {}, 
    onChange = () => {}
}: TAnswer) {
    const { type = "" } = question;
    const { answerProps = {} } = item;
    const curAnswer = answer.inputValue;

    if (type === ANSWER_TYPES.POSTCODE || type === ANSWER_TYPES.TEXT_INPUT || type === ANSWER_TYPES.NUMBER_INPUT) {
        return (
            <AnswerTextInput
                error={error}
                answerProps={answerProps}
                defaultValue={curAnswer}
                onChange={onChange}
            />
        );
    }
    
    if (type === ANSWER_TYPES.IMAGE_UPLOAD) {
        return <ImageUpload onChange={onChange} />;
    }

    if (item.nextNode === ACTIONS.CALLBACK || item.nextNode === ACTIONS.CALL_US) {
        return <ActionTile item={item} onClick={onClick} />;
    }

    if (!type) {
        if (!item.content && !item.icon) return null;
        return <OptionTile
            option={item} onClick={onClick} />;
    }
}