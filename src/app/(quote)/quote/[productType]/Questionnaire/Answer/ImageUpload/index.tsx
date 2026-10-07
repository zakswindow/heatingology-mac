"use client";
import { useRef, useState } from "react";
import { getPresignedUrl, uploadDocument } from "@/lib/_upload";
import SharedImageUpload from "@/components/Input/ImageUpload";
import styles from './style.module.scss';
import classNames from "classnames";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import Banner from "@/components/Image/Banner";
import Button from "@/components/Button";

const MAX_IMAGES = 5;

type TImageUpload = {
    onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

type TFileInfo = {
    id: number;
    name: string;
    size: string;
    previewUrl: string;
    fileUrl: string;
    status: "uploading" | "done" | "error";
};

function formatBytes(bytes: number): string {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function ImageUpload ({ onChange }: TImageUpload) {
    const [files, setFiles] = useState<TFileInfo[]>([]);
    const [uploadKey, setUploadKey] = useState(0);
    const { isMobile } = useMediaQueries();
    const mobileInputRef = useRef<HTMLInputElement>(null);

    const emitChange = (updated: TFileInfo[]) => {
        const urls = updated.filter(f => f.status === "done").map(f => f.fileUrl);
        onChange({ target: { value: urls } } as unknown as React.ChangeEvent<HTMLInputElement>);
    };

    const handleUploaded = async (file: File) => {
        if (!file) return;

        const id = Date.now();
        const entry: TFileInfo = {
            id,
            name: file.name,
            size: formatBytes(file.size),
            previewUrl: URL.createObjectURL(file),
            fileUrl: "",
            status: "uploading",
        };

        setFiles(prev => [...prev, entry]);
        setUploadKey(k => k + 1);

        const uploadUrl = await getPresignedUrl({ filename: file.name, contentType: file.type });
        if (!uploadUrl?.url) {
            setFiles(prev => {
                const updated = prev.map(f => f.id === id ? { ...f, status: "error" as const } : f);
                emitChange(updated);
                return updated;
            });
            return;
        }

        const { success, result } = await uploadDocument({ name: file.name, file, uploadUrl });
        setFiles(prev => {
            const updated = prev.map(f =>
                f.id === id
                    ? { ...f, status: success && result ? "done" as const : "error" as const, fileUrl: result?.fileUrl ?? "" }
                    : f
            );
            emitChange(updated);
            return updated;
        });
    };

    const handleRemove = (id: number) => {
        setFiles(prev => {
            const updated = prev.filter(f => f.id !== id);
            emitChange(updated);
            return updated;
        });
    };

    const canAddMore = files.length < MAX_IMAGES;

    const handleMobileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUploaded(file);
        setUploadKey(k => k + 1);
    };

    return (
        <>
            {canAddMore && (
                isMobile ? (
                    <div className={styles.mobileUploadContainer}>
                        <figure className={styles.mobileUploadIcon}>
                            <Banner bannerUrl={"/engineerSignup/upload.svg"} alt={""} />
                        </figure>
                        <Button
                            type="button"
                            className={styles.mobileAddButton}
                            onClick={() => mobileInputRef.current?.click()}
                        >
                            Add files
                        </Button>
                        <input
                            key={uploadKey}
                            ref={mobileInputRef}
                            type="file"
                            accept=".jpg,.png,.svg,.zip"
                            onChange={handleMobileInputChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                ) : (
                    <div className={styles.uploadContainer}>
                        <p className={styles.uploadNote}>{`You can upload up to ${MAX_IMAGES} photos. (Max 5MB each)`}</p>
                        <SharedImageUpload key={uploadKey} onUploaded={handleUploaded} hideInlinePreview className={styles.sharedUpload} />
                        <p className={styles.uploadNote}>{`Only support .jpg, .png and .svg and zip files`}</p>
                    </div>
                )
            )}
            {files.map(f => (
                f.status === "uploading" ? (
                    <div key={f.id} className={styles.fileCard}>
                        <div className={styles.uploadingRow}>
                            <span className={styles.uploadingLabel}>Uploading...</span>
                            <button type="button" className={styles.deleteBtn} onClick={() => handleRemove(f.id)} aria-label="Cancel upload">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <circle cx="10" cy="10" r="10" fill="#1A1A1A" />
                                    <path d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.progressTrack}>
                            <div className={styles.progressBar} />
                        </div>
                    </div>
                ) : (
                    <div key={f.id} className={classNames(styles.fileCard, styles.fileCardRow)}>
                        <img src={f.previewUrl} alt="" className={styles.thumbnail} />
                        <div className={styles.fileInfo}>
                            <span className={styles.fileName}>{f.name}</span>
                            <span className={styles.fileSize}>{f.status === "error" ? "Upload failed" : f.size}</span>
                        </div>
                        <button type="button" className={styles.deleteBtn} onClick={() => handleRemove(f.id)} aria-label="Remove file">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="10" fill="#1A1A1A" />
                                <path d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                )
            ))}
        </>
    );
}
