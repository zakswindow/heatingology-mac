"use client";

import TextInput from "@/components/Input/TextInput";
import { useForm } from "react-hook-form";
import { USER_SELECTION_INPUTS, USER_TEXT_INPUTS } from "./config";
import Select from "@/components/Input/Selections";
import ScrollableContainer from "@/components/Section/Scrollable";
import Button from "@/components/Button";
import styles from "./style.module.scss";
import { contactDetailsFormResolver } from "@/lib/_schema/survey.schema";
import Link from "next/link";

export default function ContactDetailsForm ({ onSubmit, contactOnly = false }: { onSubmit: (data: unknown) => void; contactOnly?: boolean }) {
    const { register, control, formState: { errors, dirtyFields }, handleSubmit } = useForm({ resolver: contactDetailsFormResolver });
    return (
        <>
            <ScrollableContainer className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        control={control}
                        isDirty={Boolean(dirtyFields[USER_SELECTION_INPUTS.title.name])}
                        name={USER_SELECTION_INPUTS.title.name}
                        label={USER_SELECTION_INPUTS.title.label} 
                        options={USER_SELECTION_INPUTS.title.options}
                        error={errors.title?.message}
                    />
                    <div className={styles.names}>
                        <TextInput
                            isDirty={dirtyFields[USER_TEXT_INPUTS.firstName.name]}
                            label={USER_TEXT_INPUTS.firstName.label}
                            error={errors.firstName?.message}
                        >
                            <input type="text" {...register(USER_TEXT_INPUTS.firstName.name)} />
                        </TextInput>
                        <TextInput
                            isDirty={dirtyFields[USER_TEXT_INPUTS.lastName.name]}
                            label={USER_TEXT_INPUTS.lastName.label}
                            error={errors.lastName?.message}
                        >
                            <input type="text" {...register(USER_TEXT_INPUTS.lastName.name)} />
                        </TextInput>
                    </div>
                    <TextInput
                        isDirty={dirtyFields[USER_TEXT_INPUTS.email.name]}
                        label={USER_TEXT_INPUTS.email.label}
                        error={errors.email?.message}
                    >
                        <input type="text" {...register(USER_TEXT_INPUTS.email.name)} />
                    </TextInput>
                    <TextInput
                        isDirty={dirtyFields[USER_TEXT_INPUTS.contactNumber.name]}
                        label={USER_TEXT_INPUTS.contactNumber.label}
                        error={errors.contactNumber?.message}
                    >
                        <input type="text" {...register(USER_TEXT_INPUTS.contactNumber.name)} />
                    </TextInput>
                    <TextInput
                        label={USER_TEXT_INPUTS.note.label}
                        error={errors.addressCounty?.message}
                    >
                        <textarea className={styles.textArea} {...register(USER_TEXT_INPUTS.note.name)} rows={5} />
                    </TextInput>
                </form>
            </ScrollableContainer>
            <div className={styles.footer}>
                <Button onClick={handleSubmit(onSubmit)}>{contactOnly ? "Call me back" : "Submit"}</Button>
                <p className={styles.footerNote}>{`By submitting you agree to our `}<Link href="/legal/privacyPolicy" target="_blank">{`privacy policy`}</Link>{`.`}</p>
            </div>
        </>
    );

}