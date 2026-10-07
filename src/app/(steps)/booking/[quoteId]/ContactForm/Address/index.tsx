import { useCallback, useEffect, useState } from "react";
import ManualInput from "./Manual";
import styles from "./styles.module.scss";
import SearchInput from "./Search";
import { useGetAddressById } from "@/lib/_queries/postcode.query";

export default function ContactFormAddress ({
    errors,
    quoteData,
    form,
    isLandlord = false
}) {
    const title = isLandlord ? "Landlord address" : "Install address";
    const [isManual, setIsManual] = useState(
        isLandlord ? Boolean(quoteData.landlordAddressLine1) : Boolean(quoteData.addressLine1)
    );
    const [addressId, setAddressId] = useState("");
    const { data: addressResponse } = useGetAddressById({ id: addressId });

    useEffect(() => {
        if (addressResponse && addressResponse.result) {
            const { result } = addressResponse;
            const currentValues = form.getValues();
            if (isLandlord) {
                form.reset({
                    ...currentValues,
                    landlordPostcode: result.postcode,
                    landlordAddressLine1: result.line_1,
                    landlordAddressLine2: result.line_2,
                    landlordAddressCity: result.town_or_city,
                    landlordAddressCounty: result.county
                });
            } else {
                form.reset({
                    ...currentValues,
                    postcode: result.postcode,
                    addressLine1: result.line_1,
                    addressLine2: result.line_2,
                    addressCity: result.town_or_city,
                    addressCounty: result.county
                });
                
            }
        }
    }, [addressResponse, isLandlord, form]);

    const onEnterManual = useCallback(() => {
        setIsManual(true);
    }, []);
    const onSearchPostcode = useCallback(() => {
        setIsManual(false);
    }, []);

    const onSelectAddress = useCallback((selection) => {
        setAddressId(selection.id);
        setIsManual(true);
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.sectionTitle}> { title } </div>
            {
                isManual ?
                    <fieldset className={styles.sectionFieldset}>
                        <ManualInput
                            quoteData={quoteData}
                            errors={errors}
                            form={form}
                            isLandlord={isLandlord}
                        />
                    </fieldset>
                    :
                    <SearchInput onSelectAddress={onSelectAddress} isLandlord={isLandlord} />
            }
            {
                isManual ?
                    <p className={styles.sectionFootprint}> 
                        {`Need to search for a different address? `}
                        <span className={styles.clickable} onClick={onSearchPostcode}>Click here</span>
                    </p>
                    :
                    <p className={styles.sectionFootprint}> {`Can't find your address? `}
                        <span className={styles.clickable} onClick={onEnterManual}> Enter manually. </span>
                    </p>
            }
        </section>
    );
}