import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from './style.module.scss';
import { UseFormRegister } from "react-hook-form";
import { CreateDocumentsData } from "@/app/api/engineers/_parser/document";
import Banner from "@/components/Image/Banner";
import Button from "@/components/Button";
import Preview from "./Preview";
import classNames from "classnames";


export default function ImageUpload ({ onUploaded, error = null, defaultFile = null, className = "", hideInlinePreview = false }) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [targetFile] = e.target.files || []; // Get the first file selected

        if (targetFile) {
            // Create a preview URL for the image
            handleFile(targetFile);
        }

        if (onUploaded) {
            onUploaded(targetFile);
        }
    };

    const handleFile = async (file) => {
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const [item] = e.dataTransfer.items;
        if (item.kind === 'file') {
            const file = item.getAsFile();
            handleFile(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (defaultFile) {
            handleFile(defaultFile);
        }
    }, [defaultFile]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <div
                className={classNames(styles.uploadContainer, className)}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >

                {
                    imagePreview && !hideInlinePreview ?
                        <Preview
                            image={imagePreview}
                            onDelete={() => {
                                setImagePreview(null);
                            }}
                        />:
                        <div className={styles.dndContainer}>
                            <figure className={styles.uploadIcon}>
                                <Banner bannerUrl={"/engineerSignup/upload.svg"} alt={""} />
                            </figure>

                            <p className={styles.description}> Drag your file(s) to start uploading </p>

                            <div className={styles.divider}>
                                <span>OR</span>
                            </div>

                            <Button type="button" className={styles.browse} onClick={handleButtonClick}> 
                                Browse file 
                            </Button>
      
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={".jpg,.png,.svg,.zip"}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                }
            </div>
            {
                (error && error.message) && <p className={styles.errorMessage}> {error.message}</p>
            }

        </>
    );
}