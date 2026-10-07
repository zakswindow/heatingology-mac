import TextInput from "@/components/Input/TextInput";
import styles from "./style.module.scss";

export default function ContactFormTextInput ({ 
    inputConfig, 
    errors, 
    defaultValue = "", 
    register 
}) {
    const { name } = inputConfig;
    const errorMessage = errors[name] ? errors[name].message : null;

    return (
        <TextInput
            className={styles.textInput}
            label={inputConfig.label}
            error={errorMessage}
        >
            <input type="text" placeholder={inputConfig.placeholder} defaultValue={defaultValue} {...register(name)} />
        </TextInput>
    )
}