import TextInput from "@/components/Input/TextInput";
import styles from "./style.module.scss";
import { useState } from "react";

export default function AnswerTextInput ({ error, answerProps, defaultValue, onChange }: {
    error?: string | null;
    answerProps: { label?: string; placeholder?: string; tail?: string };
    defaultValue?: unknown;
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [textInput, setTextInput] = useState(defaultValue || "");
    
    return (
        <TextInput 
            error={error} 
            className={styles.textInputContainer} 
            label={answerProps.label ?? ""}
        >
            <div className={styles.inputWithTail}>
            <input
                type="text"
                placeholder={answerProps.placeholder ?? ""}
                onChange={(evt) => {
                    setTextInput(evt.target.value);
                    onChange(evt);
                }}
                value={textInput as string}
            />
            { answerProps.tail ? 
                <span> { answerProps.tail }</span>
                : null
            }
            </div>
        </TextInput>
    );
}