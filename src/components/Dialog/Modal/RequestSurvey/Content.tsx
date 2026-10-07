"use client";

import { uploadDocument } from "@/lib/_upload";
import ContactDetailsForm from "./ContactDetails";
import UploadImagesForm from "./UploadImages";
import { useCallback, useState } from "react";
import { useCreateSurvey } from "@/lib/_mutations/survey.mutate";
import Button from "@/components/Button";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import Tel from "@/components/Anchor/Tel";

type TRequestSurveyContent = {
    contactOnly?: boolean;
    onClose?: () => void;
    onSubmitted?: () => void;
}

export default function RequestSurveyContent ({ contactOnly = false, onClose, onSubmitted }: TRequestSurveyContent) {
    const [curForm, setCurForm] = useState(contactOnly ? 1 : 0);
    const [imageFiles, setImageFiles] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const createSurvey = useCreateSurvey();

    const onSubmit = ({ images, contact }) => {
        const surveyBody: Record<string, unknown> = { ...contact };

        if (!images) {
            if (contactOnly) surveyBody.contactOnly = true;
            createSurvey.mutateAsync({ body: surveyBody }).then(() => { setSubmitted(true); onSubmitted?.(); });
            return;
        }

        const imageUploads = Object.entries(images).map(async ([key, value]) => {
            const { file, uploadUrl } = value;
            return await uploadDocument({ name: key, file, uploadUrl });
        });

        Promise.all(imageUploads).then((response) => {
            response.forEach(({ result }) => {
                if (result) {
                    surveyBody[result.name] = result.fileUrl;
                }
            });

            return createSurvey.mutateAsync({ body: surveyBody });
        }).then(() => { setSubmitted(true); onSubmitted?.(); });
    };

    const onUploadImagesSubmit = useCallback((data) => {
        setImageFiles(data);
        setCurForm((prev) => prev + 1);
    }, []);

    const onContactDetailsSubmit = useCallback((data) => {
        onSubmit({
            images: imageFiles,
            contact: data
        });
    }, [imageFiles]);

    if (submitted) {
        return (
            <div className={styles.confirmation}>
                <Icon icon={ICONS.CHECK_MARK_FILLED} className={styles.submitChecked} />
                <p className={styles.submitTitle}>Thank you</p>
                <p className={styles.submitDescription}>Your details have been submitted. We will call you shortly.</p>
                <div className={styles.submitDescription}>
                    {`Still need help? Call us on `}
                    <Tel />
                </div>
                <Button className={styles.submitButton} onClick={onClose}>Close</Button>
            </div>
        );
    }

    return (
        <>
            {
                curForm === 0 &&
                <UploadImagesForm onSubmit={onUploadImagesSubmit}/>
            }
            {
                curForm === 1 &&
                <ContactDetailsForm onSubmit={onContactDetailsSubmit} contactOnly={contactOnly} />
            }
        </>
    );
}