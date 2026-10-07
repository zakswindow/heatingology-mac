import styles from "./style.module.scss";

export default function RadioButton () {
    return (
        <label key={item.value} className={classNames(styles.inputContainer, optionCss, { [optionSelectedCss]: isSelected })}>
            <span className={styles.radioMarkContainer}>
                <span
                    className={classNames(styles.radioMark, { [styles.checked]: isSelected })}>
                    { !radioMark && <span className={styles.radioDot} />}
                </span>
                { isSelected && radioMark }
            </span> 
            <input
                type="radio"
                value={item.value}
                {...register(name, {
                    onChange: (evt) => {
                        if (onChange) {
                            onChange(evt);
                        }
                        setSelected(evt.target.value);
                    } 
                })}
            />
            <span> { item.label }</span>
        </label>
    );
}