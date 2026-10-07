import { useGetQualifications } from "@/lib/_queries/engineers.query";
import Loading from "@/app/loading";
import styles from "./style.module.scss";
import ChecklistSection from "./ChecklistSection";
import { useForm } from "react-hook-form";
import ContinueButton from "../_components/Buttons/Continue";
import { useCallback, useEffect } from "react";
import BackButton from "../_components/Buttons/Back";
import { useRegistrationContext } from "../_context";

export default function QualificationsForm ({ onNext, onBack }) {
    const { data: { result: qualifications = null } = {}, isLoading, isError } = useGetQualifications();
    const { register, handleSubmit, reset } = useForm();
    const { regDetails, updateRegistration } = useRegistrationContext();

    const onSubmit = useCallback((data) => {
        updateRegistration({ qualifications: data.qualifications });
        onNext();
    }, [onNext, updateRegistration]);

    useEffect(() => {
        if (regDetails?.qualifications) {
            reset({ qualifications: regDetails.qualifications });
        }
    }, [regDetails, reset]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Something is wrong!");
    }

    if (qualifications) {
        return (
            <>
                <h1 className={styles.title}> Qualifications </h1>
                <p className={styles.description}> You are qualified in...</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    {
                        qualifications.map((item) => {
                            return (
                                <ChecklistSection
                                    className={styles.checklistSection}
                                    key={item.title} 
                                    label={item.title} 
                                    data={item.qualifications} 
                                    register={register}
                                    defaultValues={regDetails.qualifications}
                                />
                            );
                        })
                    }
                    <div className={styles.buttonList}>
                        <BackButton onClick={onBack} />
                        <ContinueButton />
                    </div>
                </form>
            </>
        );
    }
}