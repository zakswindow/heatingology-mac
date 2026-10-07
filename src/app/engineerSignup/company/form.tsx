'use client';

import { CreateCompanyInput, CreateCompanySchema } from "@/app/api/engineers/_parser/company";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { COMPANY_CHECKLIST, COMPANY_TEXT_INPUTS } from "./config";
import TextInput from "@/components/Input/TextInput";
import RadioInput from "@/components/Input/RadioInput";
import BackButton from "../_components/Buttons/Back";
import ContinueButton from "../_components/Buttons/Continue";
import styles from "./style.module.scss";
import { useRegistrationContext } from "../_context";
import { useEffect } from "react";

export default function CompanyDetailsForm ({ onNext, onBack }) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateCompanyInput>({ resolver: zodResolver(CreateCompanySchema) });
    const { regDetails, updateRegistration } = useRegistrationContext();

    const onSubmit = (data) => {
        updateRegistration({ company: data });
        onNext(data);
    };

    const onError = (errors) => {
        console.error(errors);
    };

    useEffect(() => {
        if (regDetails?.company) {
            reset({ ...regDetails.company });
        }
    }, [regDetails, reset]);
    

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit, onError)}
        >
            <h1 className={styles.title}> Company</h1>
            <p className={styles.description}> Tell us more... </p>

            <TextInput
                label={COMPANY_TEXT_INPUTS.gasSafeLicense.label}
                error={errors.gasSafeLicense?.message}
            >
                <input type="text" {...register(COMPANY_TEXT_INPUTS.gasSafeLicense.name)} />
            </TextInput>
            <TextInput
                label={COMPANY_TEXT_INPUTS.name.label}
                error={errors.name?.message}
            >
                <input type="text" {...register(COMPANY_TEXT_INPUTS.name.name)} />
            </TextInput>
            <TextInput
                label={COMPANY_TEXT_INPUTS.gasSafeNumber.label}
                error={errors.gasSafeNumber?.message}
            >
                <input type="text" {...register(COMPANY_TEXT_INPUTS.gasSafeNumber.name)} />
            </TextInput>
            <TextInput
                label={COMPANY_TEXT_INPUTS.address.label}
                error={errors.address?.message}
            >
                <input type="text" {...register(COMPANY_TEXT_INPUTS.address.name)} />
            </TextInput>
            <TextInput
                label={COMPANY_TEXT_INPUTS.companyNumber.label}
                error={errors.companyNumber?.message}
            >
                <input type="text" {...register(COMPANY_TEXT_INPUTS.companyNumber.name)} />
            </TextInput>
            <RadioInput
                label={COMPANY_CHECKLIST.type.label}
                options={COMPANY_CHECKLIST.type.list}
                name={COMPANY_CHECKLIST.type.name}
                error={errors[COMPANY_CHECKLIST.type.name]}
                register={register}
            />
            <RadioInput
                label={COMPANY_CHECKLIST.vatRegistered.label}
                options={COMPANY_CHECKLIST.vatRegistered.list}
                name={COMPANY_CHECKLIST.vatRegistered.name}
                error={errors[COMPANY_CHECKLIST.vatRegistered.name]}
                register={register}
            />
            <div className={styles.buttonList}>
                <BackButton className={styles.button} onClick={onBack} />
                <ContinueButton className={styles.button} />
            </div>
        </form>        
    );
}