'use client';

import { TQualification } from "@/app/api/engineers/qualifications/route";
import { QualificationCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import CheckboxInput from "@/components/Input/CheckboxInput";
import FromSection from "./section";


export type TClientFormData = Partial<Record<
    QualificationCategory, {
        label: string;
        sections: {
            label: string | null,
            options: TQualification[]
        }[]
    }>>

type TClientForm = { data: TClientFormData; onNext: () => void; onBack: () => void; }

function parseCheckboxInputOptions (data: TQualification[]) {
    return data.map((item) => {
        return ({
            label: item.name,
            value: item.id
        });
    });
}

export default function ClientForm ({ data, onNext, onBack }: TClientForm) {
    const { register, handleSubmit } = useForm();
    const registerName = "qualifications";
    
    const onSubmit = () => {onNext()};

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1> Qualifications </h1>
            {
                data.GAS_SAFE && data.GAS_SAFE.label &&
                <FromSection label={data.GAS_SAFE.label}>
                    {
                        data.GAS_SAFE?.sections.map((item) => {
                            return (
                                <CheckboxInput
                                    key={item.label}
                                    label={item.label}
                                    options={parseCheckboxInputOptions(item.options)}
                                    {...register(registerName)}
                                />
                            );
                        })
                    }
                </FromSection>
            }
            {
                data.INSTALL_ABILITIES?.label &&
                <FromSection label={data.INSTALL_ABILITIES.label}>
                    {
                        data.INSTALL_ABILITIES?.sections.map((item) => {
                            return (
                                <CheckboxInput
                                    key={item.label}
                                    label={item.label}
                                    options={parseCheckboxInputOptions(item.options)}
                                    {...register(registerName)}
                                />
                            );
                        })
                    }
                </FromSection>
            }
            {
                data.TECHNICAL_ABILITIES?.label &&
                <FromSection label={data.TECHNICAL_ABILITIES.label}>
                    {
                        data.TECHNICAL_ABILITIES?.sections.map((item) => {
                            return (
                                <CheckboxInput
                                    key={item.label}
                                    label={item.label}
                                    options={parseCheckboxInputOptions(item.options)}
                                />
                            );
                        })
                    }
                </FromSection>
            }
            <button onClick={onBack}> Back </button>
            <button type="submit"> Next </button>
        </form>
    );
}