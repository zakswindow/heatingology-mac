'use client';

type TFormSection = {
    label: string;
    children: React.ReactNode;
}
export default function FromSection ({ label, children }: TFormSection) {
    return (
        <fieldset>
            <legend> { label }</legend>
            { children }
        </fieldset>
    );
}