"use client";

import { ChangeEvent, useCallback, useRef, useState } from "react";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import { Controller } from "react-hook-form";
import { getPresignedUrl } from "@/lib/_upload";
import Image from "@/components/Image";
import classNames from "classnames";

export default function MiniImageUpload ({ headline, description, name, control }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setImagePreview] = useState<string | null>(null);

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>, onChange) => {
        const [targetFile] = e.target.files || []; // Get the first file selected

        if (!targetFile) {
            return;
        }

        try {
            const previewUrl = URL.createObjectURL(targetFile);
            setImagePreview(previewUrl);

            const presignedUrl = await getPresignedUrl({
                filename: targetFile.name,
                contentType: targetFile.type
            });

            onChange({
                file: targetFile,
                uploadUrl: presignedUrl
            });
        } catch (e) {
            console.error("Failed to upload image: ", e);
        }
    };

    const onIconClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange }, fieldState: { error } }) => {
                if (error) {
                    console.error(error);
                }

                const onRemove = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    setImagePreview(null);
                    onChange(undefined);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                };

                return (<div className={styles.container}>
                    <div className={styles.thumbnailWrapper}>
                        <figure className={classNames(styles.iconContainer, { [styles.uploaded]: Boolean(previewUrl) })} onClick={onIconClick}>
                            {
                                previewUrl ?
                                    <Image src={previewUrl} width={60} height={60} alt={name} />
                                    :
                                    <Icon
                                        className={styles.icon}
                                        icon={ICONS.PHOTO_UPLOAD}
                                    />
                            }
                        </figure>
                        {previewUrl && (
                            <button type="button" className={styles.removeButton} onClick={onRemove}>
                                <Icon className={styles.removeIcon} icon={ICONS.CORSS_FILLED} />
                            </button>
                        )}
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={".jpg,.png,.svg"}
                        onChange={(evt) => {
                            handleImageChange(evt, onChange);
                        }}
                        hidden
                    />
                    <div className={styles.metadata}>
                        <span className={styles.headline}> { headline }</span>
                        <span className={styles.description}> { description }</span>
                        { error && <span className={styles.error}> { `Please upload an image.` }</span>}
                    </div>
                </div>);                        
            }}
        />
    );
}