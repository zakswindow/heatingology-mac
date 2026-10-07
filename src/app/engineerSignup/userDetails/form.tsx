'use client';

import Select from "@/components/Input/Selections";
import TextInput from "@/components/Input/TextInput";
import { USER_IMAGE_INPUTS, USER_SELECTION_INPUTS, USER_TEXT_INPUTS } from "./config";
import { useForm } from "react-hook-form";
import { CreateUserInput, CreateUserSchema } from "./validate";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./style.module.scss";
import UploadPhoto from "./UploadPhoto";
import { useRegistrationContext } from "../_context";
import { useCallback, useEffect } from "react";
import ContinueButton from "../_components/Buttons/Continue";

export default function UserDetailsForm ({ onNext }) {
    const { regDetails, updateRegistration } = useRegistrationContext();
    const { control, register, handleSubmit, formState: { errors, dirtyFields }, reset, setValue, getValues } = useForm<CreateUserInput>({ 
        resolver: zodResolver(CreateUserSchema), 
        defaultValues: {
            [USER_TEXT_INPUTS.firstName.name]: "",
            [USER_TEXT_INPUTS.lastName.name]: "",
            [USER_TEXT_INPUTS.contactNumber.name]: "",
            [USER_TEXT_INPUTS.email.name]: ""
        }
    });

    const onSubmit = (data: CreateUserInput) => {
        updateRegistration({ userDetails: data });
        onNext(data);
    };

    const onImageUploaded = useCallback((name) => (file) => {
        setValue(name, file);
    }, [setValue]);

    useEffect(() => {
        if (regDetails?.userDetails) {
            reset({ ...regDetails.userDetails });
        }
    }, [regDetails, reset]);

    return (
        <>
            <h1 className={styles.title}> Create account</h1>
            <p className={styles.description}> The onboarding... </p>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Select
                    control={control}
                    isDirty={Boolean(dirtyFields[USER_SELECTION_INPUTS.title.name])}
                    name={USER_SELECTION_INPUTS.title.name}
                    label={USER_SELECTION_INPUTS.title.label} 
                    options={USER_SELECTION_INPUTS.title.options}
                    error={errors.title?.message}
                /> 
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
                <TextInput
                    isDirty={dirtyFields[USER_TEXT_INPUTS.contactNumber.name]}
                    label={USER_TEXT_INPUTS.contactNumber.label}
                    error={errors.contactNumber?.message}
                >
                    <input type="text" {...register(USER_TEXT_INPUTS.contactNumber.name)} />
                </TextInput>
                <TextInput
                    isDirty={dirtyFields[USER_TEXT_INPUTS.email.name]}
                    label={USER_TEXT_INPUTS.email.label}
                    error={errors.email?.message}
                >
                    <input type="text" {...register(USER_TEXT_INPUTS.email.name)} />
                </TextInput>

                <UploadPhoto 
                    file={getValues(USER_IMAGE_INPUTS.profileImage.name)}
                    onImageUploaded={onImageUploaded(USER_IMAGE_INPUTS.profileImage.name)} 
                    error={errors[USER_IMAGE_INPUTS.profileImage.name]}
                />
                <ContinueButton />
                <small className={styles.footprint}>
                    {`By submitting you agree to our `}
                    <a href="/legal/privacyPolicy">{`privacy policy.`}</a>
                </small>
            </form>
        </>
    );
}