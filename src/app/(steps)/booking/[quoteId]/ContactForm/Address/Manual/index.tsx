import { LANDLORD_ADDRESS_INPUTS, USER_TEXT_INPUTS } from "../../config";
import ContactFormTextInput from "../../TextInput";
import styles from './style.module.scss';

export default function ManualInput ({ quoteData, errors, form, isLandlord }) {    
    const { register } = form;
    const inputs = isLandlord ? LANDLORD_ADDRESS_INPUTS : USER_TEXT_INPUTS;

    return (
        <>
            {
                !isLandlord &&
                <p className={styles.description}> Type in the place you would like to install. </p>
            }
            <ContactFormTextInput
                inputConfig={inputs.postcode}
                errors={errors}
                defaultValue={quoteData[inputs.postcode.name]}
                register={register}
            />
            <ContactFormTextInput
                inputConfig={inputs.addressLine1}
                errors={errors}
                defaultValue={quoteData[inputs.addressLine1.name]}
                register={register}
            />
            <ContactFormTextInput
                inputConfig={inputs.addressLine2}
                errors={errors}
                defaultValue={quoteData[inputs.addressLine2.name]}
                register={register}
            />
            <ContactFormTextInput
                inputConfig={inputs.addressCity}
                errors={errors}
                defaultValue={quoteData[inputs.addressCity.name]}
                register={register}
            />
            <ContactFormTextInput
                inputConfig={inputs.addressCounty}
                errors={errors}
                defaultValue={quoteData[inputs.addressCounty.name]}
                register={register}
            />
        </>
    );
}