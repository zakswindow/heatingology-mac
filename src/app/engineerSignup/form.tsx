'use client';
import { Suspense } from "react";
import CompanyDetailsForm from "./company/form";
import DocumentForm from "./documents/form";
import LocationForm from "./location/form";
import QualificationsForm from "./qualifications/form";
import UserDetailsForm from "./userDetails/form";
import Loading from "../loading";

const EngineerSignUpForm = ({ onNextForm, onBackForm, curStepIndex }) => {
    const formSteps = [
        <UserDetailsForm key="user-form" onNext={onNextForm} />,
        <CompanyDetailsForm key="company-form" onNext={onNextForm} onBack={onBackForm} />,
        <QualificationsForm key="qualification-form" onNext={onNextForm} onBack={onBackForm} />,
        <DocumentForm key="document-form" onNext={onNextForm} onBack={onBackForm} />,
        <LocationForm key="location-form" onNext={onNextForm} onBack={onBackForm} />
    ];

    return (
        <Suspense fallback={<Loading />}>
            {
                formSteps[curStepIndex]
            }
        </Suspense>
    );
};

export default EngineerSignUpForm;