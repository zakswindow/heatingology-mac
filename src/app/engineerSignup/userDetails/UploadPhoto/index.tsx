import ImageUpload from "@/components/Input/ImageUpload";
import styles from "./style.module.scss";
import { useEffect } from "react";

export default function UploadPhoto ({ onImageUploaded, error, file }) {
    return (
        <>
            <div className={styles.title}> Upload Photo </div>
            <p className={styles.description}>You can upload 1 photo only. (Max 5MB)</p>
            <ImageUpload onUploaded={onImageUploaded} error={error} defaultFile={file} />   
            <small className={styles.footprint}>
                Only support .jpg, .png and .svg and zip files
            </small>
        </>
    );
}