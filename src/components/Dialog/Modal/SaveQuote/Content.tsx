import TextInput from "@/components/Input/TextInput";
import { SAVE_QUOTE_TEXT_INPUTS } from "./config";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { CreateSaveOuoteInput, CreateSaveOuoteSchema } from "./_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/Button";
import styles from './style.module.scss';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSendQuote } from "@/lib/_mutations/quote.mutate";
import Icon, { ICONS } from "@/components/Image/Icons";

export type TSaveQuoteContent = { quoteId: string; onClose: () => void; onSubmitted?: () => void; }

export default function SaveQuoteContent ({ quoteId, onClose, onSubmitted }: TSaveQuoteContent) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateSaveOuoteInput>({ resolver: zodResolver(CreateSaveOuoteSchema) });
    const [watchedName, watchedEmail] = watch(['name', 'email']);
    const isSaveDisabled = !watchedName?.trim() || !watchedEmail?.trim();
    const router = useRouter();
    const sendQuote = useSendQuote();
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const onSubmit = useCallback(async (data: CreateSaveOuoteInput) => {
        if (data.email) {
            setEmail(data.email);
        }
        await sendQuote.mutateAsync({
            email: data.email,
            name: data.name,
            quoteId
        });
        setSubmitted(true);
        onSubmitted?.();
    }, [sendQuote, quoteId, onSubmitted]);

    const onSkip = useCallback(() => {
        onClose();
        router.push(`/packages/${quoteId}`);
    }, [onClose, quoteId, router]);

    if (submitted) {
        return (
            <div className={styles.confirmation}>
                <Icon icon={ICONS.CHECK_MARK_FILLED} className={styles.submitChecked} />
                <p className={styles.submitTitle}>{`Your quotes\nare saved !`}</p>
                <p className={styles.submitDescription}>{`Your quotes will be secured for 7 days and the mail has been sent to you at ${email}`}</p>
            </div>
        );
    }

    return (
        <>
            <p className={styles.description}> Secure your quotes for 7 days. </p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    label={SAVE_QUOTE_TEXT_INPUTS.name.label}
                    error={errors.name?.message}
                >
                    <input type="text" {...register(SAVE_QUOTE_TEXT_INPUTS.name.name)} />
                </TextInput>
                <TextInput
                    label={SAVE_QUOTE_TEXT_INPUTS.email.label}
                    error={errors.email?.message}
                >
                    <input type="text" {...register(SAVE_QUOTE_TEXT_INPUTS.email.name)} />
                </TextInput>
                <TextInput
                    label={SAVE_QUOTE_TEXT_INPUTS.contactNumber.label}
                    error={errors.contactNumber?.message}
                >
                    <input type="text" {...register(SAVE_QUOTE_TEXT_INPUTS.contactNumber.name)} />
                </TextInput>

                <Button type="submit" className={`${styles.button} ${styles.buttonFirst}`} disabled={isSaveDisabled}>
                    <Icon icon={ICONS.SAVE} /> 
                    Save my quote
                </Button>
                <Button onClick={onSkip} type="button" variant="outline" className={styles.button}>
                    Continue without saving
                    <Icon icon={ICONS.ARROW_RIGHT} />
                </Button>
            </form>
            <p className={styles.footer}>
                {`By submitting you agree to our `}
                <Link className={styles.link} href="/legal/privacyPolicy">
                    privacy policy.
                </Link>
            </p>
        </>
    );
}