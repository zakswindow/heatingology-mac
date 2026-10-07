import CheckboxInput from "@/components/Input/CheckboxInput";
import styles from "./style.module.scss";
import classNames from "classnames";

export default function ChecklistSection ({ className = "", label, data, register, defaultValues }) {
    const registerName = "locations";

    return (
        <section>
            <h2 className={classNames(styles.title, className)}> { label } </h2>
            <fieldset className={styles.fieldset}>
                {
                    data.groups ?
                        data.groups.map((item) => {
                            if (item.title) {
                                return <CheckboxInput
                                    listClassName={styles.checklist}
                                    className={styles.checklistContainer}
                                    key={item.title}
                                    label={item.title} 
                                    options={item.data}
                                    defaultValues={defaultValues}
                                    {...register(registerName)} />;
                            }
                        })
                        : 
                        <CheckboxInput
                            listClassName={styles.checklist}
                            className={styles.checklistContainer}
                            label={""}
                            options={data}
                            defaultValues={defaultValues}
                            {...register(registerName)} />
                }
            </fieldset>
        </section>
    );
}