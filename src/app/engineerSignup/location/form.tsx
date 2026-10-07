'use client';
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import BackButton from "../_components/Buttons/Back";
import ContinueButton from "../_components/Buttons/Continue";
import ChecklistSection from "./ChecklistSection";
import { LOCATION_CODES } from "./config";
import { useRegistrationContext } from "../_context";
import { useEffect } from "react";

export default function LocationForm ({ onNext, onBack }) {
    const { register, handleSubmit, reset, getValues } = useForm();
    const { regDetails, updateRegistration } = useRegistrationContext();

    const onSubmit = (data ) => {
        if (data && data.locations && data.locations.length > 0) {
            updateRegistration(data);
            onNext({
                ...regDetails,
                locations: data.locations
            });
        } else {
            console.error("Invalid data");
        }
    };

    useEffect(() => {
        if (regDetails?.locations) {
            reset({ locations: regDetails.locations });
        }
    }, [regDetails, reset]);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {
                LOCATION_CODES.map((item) => {
                    if (item) {
                        return (
                            <ChecklistSection
                                className={styles.section}
                                key={item.label}
                                label={item.label}
                                data={item.options}
                                register={register}
                                defaultValues={regDetails.locations}
                            />
                        );
                    }
                })
            }
            <div className={styles.buttonList}>
                <BackButton onClick={onBack} />
                <ContinueButton />
            </div>
        </form>
    );
}