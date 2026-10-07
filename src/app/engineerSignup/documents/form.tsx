'use client';

import { DOCUMENTS } from "./config";
import ImageUpload from "@/components/Input/ImageUpload";
import DateInput from "@/components/Input/DateInput";
import { useForm } from "react-hook-form";
import { CreateDocumentsData, CreateDocumentsSchema } from "@/app/api/engineers/_parser/document";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFile, uploadDocument } from "./helper";
import styles from "./style.module.scss";
import BackButton from "../_components/Buttons/Back";
import ContinueButton from "../_components/Buttons/Continue";
import classNames from "classnames";
import { getPresignedUrl } from "@/lib/_upload";
import { useCallback, useEffect } from "react";
import { useRegistrationContext } from "../_context";

type TDocumentForm = {
    onNext: (data) => void;
    onBack: () => void;
}

export default function DocumentForm ({ onNext, onBack }: TDocumentForm) {
    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm<CreateDocumentsData>({ resolver: zodResolver(CreateDocumentsSchema) });
    const { regDetails, updateRegistration } = useRegistrationContext();

    const listByOrder = [
        DOCUMENTS.GAS_SAFE_CARD,
        DOCUMENTS.CCN1_ACS,
        DOCUMENTS.INSURANCE,
        DOCUMENTS.FLUE_GAS_ANALYSER,
        DOCUMENTS.DBS
    ];

    const onSubmit = async (data) => {
        for (const key in data) {
            const file = getFile(data[key]);

            // Check if input is document upload
            if (file) {
                const uploadUrl = await getPresignedUrl({
                    filename: file.name,
                    contentType: file.type
                });
                const { result } = await uploadDocument(file, uploadUrl);
                if (result) {
                    // TODO: submit the document file url
                }
            }
        }
        updateRegistration({ documents: data });
        onNext(data);
    };

    const onError = (errors) => {
        console.error("form errors: ", errors);
    };

    const onImageUploaded = useCallback((name) => (file) => {
        setValue(name, file);
    }, [setValue]);

    useEffect(() => {
        if (regDetails?.documents) {
            reset({ ...regDetails.documents });
        }
    }, [regDetails, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
            {
                listByOrder.map((list) => {
                    return (
                        <div key={list.label}>
                            <div className={styles.title}> { list.label }</div>
                            <fieldset key={list.label} className={styles.fieldset}>
                                {
                                    list.files.map((item, index) => {
                                        return (
                                            <div
                                                key={item.label}
                                                className={classNames(styles.uploadContainer, { [styles.multipleContainer]: index < list.files.length - 1 })} >
                                                {
                                                    item.label && <div className={styles.uploadTitle}> { item.label }</div>
                                                }
                                                {
                                                    item.description && <p className={styles.uploadDescription}> { item.description }</p>
                                                }
                                                <ImageUpload
                                                    defaultFile={getValues(item.name)}
                                                    key={`${list.label}-${item.label}`}
                                                    onUploaded={onImageUploaded(item.name)}
                                                    error={errors[item.name]}
                                                />
                                                {
                                                    item.footprint &&
                                                        <p className={styles.uploadFootprint}> {item.footprint } </p>
                                                }
                                            </div>
                                        );
                                    })
                                }
                                {
                                    list.date?.label && 
                                    <DateInput
                                        label={list.date.label}
                                        inputProps={
                                            { ...register(list.date.name, { required: true }) }
                                        }
                                    />
                                }
                            </fieldset>
                        </div>
                    );
                })
            }
            <div className={styles.buttonList}>
                <BackButton onClick={onBack} />
                <ContinueButton />
            </div>
        </form>
    );
}
