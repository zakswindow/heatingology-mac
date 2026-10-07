"use client";
import { Suspense, useState } from "react";
import EngineerSignUpForm from "./form";
import SignUpHeader from "./_components/Header";
import SignUpSteps from "./_components/SignUpSteps";
import { SIGN_UP_STEPS } from "./_components/SignUpSteps/_config";
import styles from "./style.module.scss";
import SimpleMenu from "@/components/Menu/SimpleMenu";
import { RegistrationContextProvider, useRegistrationContext } from "./_context";
import { useCreateEngineer } from "@/lib/_mutations/engineers.mutate";
import { parseCompanyDetails, parseDocuments, parseLocations, parseQualifications, parseUserDetails } from "./_helper";
import Loading from "../loading";

function RegistrationContent () {
    const [curStepIndex, setCurStepIndex] = useState(0);
    const { regDetails } = useRegistrationContext();
    const createEngineer = useCreateEngineer();

    const onNextForm = async (regData) => {
        const updatedIndex = curStepIndex + 1;
        if (updatedIndex < SIGN_UP_STEPS.length) {
            setCurStepIndex(updatedIndex);
        } else {
            const createEngineerData = regData || regDetails;
            const createEngineerBody = {
                engineer: await parseUserDetails(createEngineerData.userDetails),
                company: parseCompanyDetails(createEngineerData.company),
                qualifications: parseQualifications(createEngineerData.qualifications),
                documents: await parseDocuments(createEngineerData.documents),
                locations: parseLocations(createEngineerData.locations)
            };

            await createEngineer.mutateAsync({ body: createEngineerBody });
        }
    };

    const onBackForm = () => {
        setCurStepIndex((prev) => prev - 1);
    };

    const onEditStep = (index: number) => {
        setCurStepIndex(index);
    };

    return (
        <>
            <SimpleMenu />
            <section className={styles.page}>
                <Suspense fallback={<Loading />}>
                    <SignUpHeader curStepIndex={curStepIndex} steps={SIGN_UP_STEPS} />
                    <section className={styles.content}>
                        <SignUpSteps curStepIndex={curStepIndex} steps={SIGN_UP_STEPS} onEditStep={onEditStep} />
                        <div className={styles.form}>
                            <EngineerSignUpForm onNextForm={onNextForm} onBackForm={onBackForm} curStepIndex={curStepIndex} />
                        </div>
                    </section>
                </Suspense>
            </section>
        </>
    );
};

export default function EngineerSignUpPage () {
    return(
        <RegistrationContextProvider>
            <RegistrationContent />
        </RegistrationContextProvider>
    );
}
