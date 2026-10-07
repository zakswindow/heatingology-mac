import TextInput from "@/components/Input/TextInput";
import styles from "./style.module.scss";
import { USER_SELECTION_INPUTS, USER_TEXT_INPUTS } from "./config";
import { CreateContactInput, CreateContactSchema } from "./_schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import Select from "@/components/Input/Selections";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { resetFormValue } from "./_helper";
import ContactFormTextInput from "./TextInput";
import ContactFormAddress from "./Address";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function ContactForm ({ onContinue, quoteId, onReadyChange }: { onContinue: () => void; quoteId: string; onReadyChange?: (ready: boolean) => void }) {
    const form = useForm<CreateContactInput>({ resolver: zodResolver(CreateContactSchema), mode: 'onChange' });
    const { register, control, handleSubmit, formState: { errors, isValid }, reset } = form;
    const updateQuote = useUpdateQuote();
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });

    useEffect(() => {
        if (quoteResponse?.result) {
            const { result: quoteData } = quoteResponse;
            resetFormValue({ quoteData, reset });
        }
    }, [quoteResponse, reset]);

    useEffect(() => {
        onReadyChange?.(isValid);
    }, [isValid, onReadyChange]);

    const onSubmit = async (formValues) => {
        const { userType, ...values } = formValues;
        try {
            const { success, error } = await updateQuote.mutateAsync({
                id: quoteId,
                body: values 
            });
            if (success) {
                onContinue();
                return;
            }
            throw new Error(error);
        } catch (e) {
            console.error(e);
            return alert("Fail to submit contact details.");
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Fail to load the quote.");
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;
        const { isLandlord: landlordInfo = {} } = JSON.parse(quoteData.content); 
        const isLandlord = landlordInfo.inputValue;

        return (
            <section className={styles.contactFormContainer}>
                <form id="contact-form" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Select
                        label={USER_SELECTION_INPUTS.title.label} 
                        options={USER_SELECTION_INPUTS.title.options}
                        error={errors.title?.message}
                        control={control}
                        defaultValue={quoteData.title}
                        {...register(USER_SELECTION_INPUTS.title.name)}
                    /> 
                    <div className={styles.names}>
                        <ContactFormTextInput
                            inputConfig={USER_TEXT_INPUTS.firstName}
                            errors={errors}
                            defaultValue={quoteData.firstName}
                            register={register}
                        />
                        <ContactFormTextInput
                            inputConfig={USER_TEXT_INPUTS.lastName}
                            errors={errors}
                            defaultValue={quoteData.lastName}
                            register={register}
                        />
                    </div>
                    <ContactFormTextInput
                        inputConfig={USER_TEXT_INPUTS.email}
                        errors={errors}
                        defaultValue={quoteData.email}
                        register={register}
                    />
                    <ContactFormTextInput
                        inputConfig={USER_TEXT_INPUTS.contactNumber}
                        errors={errors}
                        defaultValue={quoteData.contactNumber}
                        register={register}
                    />
                    <ContactFormAddress
                        errors={errors}
                        form={form}
                        quoteData={quoteData}
                    />
                    {
                        isLandlord &&
                            <ContactFormAddress
                                errors={errors}
                                form={form}
                                quoteData={quoteData}
                                isLandlord
                            />
                    }

                    <TextInput
                        label={USER_TEXT_INPUTS.note.label}
                        error={errors.note?.message}
                    >
                        <textarea defaultValue={quoteData.note} {...register(USER_TEXT_INPUTS.note.name)} rows={5} />
                    </TextInput>

                    <p className={styles.footprint}>
                        {`By submitting you agree to our `}
                        <a href="/legal/privacyPolicy">privacy policy.</a>
                    </p>

                    <Button disabled={!isValid} className={styles.submitButton} type="submit">
                        Continue
                        <Icon icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </form>
            </section>
        );
    }
}