"use client";
import MiniImageUpload from "@/components/Input/ImageUpload/MiniImageUpload";
import { IMAGE_UPLOADS } from "./config";
import styles from "./style.module.scss";
import ScrollableContainer from "@/components/Section/Scrollable";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import { uploadImagesFormResolver } from "@/lib/_schema/survey.schema";

export default function UploadImagesForm ({ onSubmit }) {
    const description = `Want us to check things before appointment? Upload images and our engineers will complete a multipoint desktop survey for you.`;
    const { control, handleSubmit, watch } = useForm({ resolver: uploadImagesFormResolver });
    const allUploaded = IMAGE_UPLOADS.every(({ name }) => Boolean(watch(name)));

    return (
        <>
            <p className={styles.description}> {description} </p>
            <form onSubmit={ handleSubmit(onSubmit)}>
                <ScrollableContainer className={styles.scrollable}>
                    <section className={styles.form}>
                        {
                            IMAGE_UPLOADS.map((item) => {
                                return (
                                    <MiniImageUpload
                                        key={item.headline}
                                        headline={item.headline}
                                        description={item.description}
                                        control={control}
                                        name={item.name}
                                    />
                                );

                            })
                        }
                    </section>
                </ScrollableContainer>
                <div className={styles.footer}>
                    <Button type="submit" disabled={!allUploaded}> Continue </Button>
                </div>
            </form>
        </>
    );
}

            