import styles from "./style.module.scss";
import { useCreateRedirect } from "@/lib/_mutations/checkout.mutate";
import { useCallback } from "react";
import { Product, ProductType, Quote } from "@prisma/client";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";
import Icon, { ICONS } from "@/components/Image/Icons";
import PayButton from "../../PayButton";
import PrivacyPolicy from "@/components/Anchor/PrivacyPolicy";

type TQuote = Quote & { products: Product[]; }

function getCreateKandaJobItems (quoteData: TQuote) {
    const { products } = quoteData;
    
    if (!products || products.length === 0) {
        console.warn("The cart is empty!");
        return [];
    }

    // Currently only one item of each product will be purchased.
    const QUANTITY = 1;
    return products.map((item) => {
        return ({
            title: item.model,
            quantity: QUANTITY * 100, // 1 unit = 100
            price: {
                currency: "GBP",
                amount: (quoteData.price * 100) // amount in pence 
            },
            vat_rate: "vat_not_set",
            vat: {
                currency: "GBP",
                amount: 0 
            }
        });
    });
}

function getCreateKandaWorkType (quoteData: TQuote) {
    switch (quoteData.productType) {
        case ProductType.boiler:
            return "boiler_swap";
        case ProductType.ev_charger:
            return "ev_charger";
        default:
            return "other";
    }
}

function getCreateKandaData (quoteData: TQuote) {
    
    return {
        reference: quoteData.id,
        work_type: getCreateKandaWorkType(quoteData),
        enabled_rates: [],
        deposit_type: "no_deposit",
        deposit_value: {
            currency: "GBP",
            amount: 0
        },
        customer: {
            first_name: quoteData.firstName,
            last_name: quoteData.lastName,
            phone: quoteData.contactNumber,
            email: quoteData.email,
            address: {
                line_1: quoteData.addressLine1,
                line_2: quoteData.addressLine2,
                city: quoteData.addressCity,
                county: quoteData.addressCounty,
                country: "United Kingdom",
                postcode: quoteData.postcode
            }
        },
        job_items: getCreateKandaJobItems(quoteData),
        redirect_urls: {
            checkout_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking/${quoteData.id}`,
            success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
            failure_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking/${quoteData.id}`,
            webhook_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`
        }
    };
}

type TKandaContent = { quoteData: Quote & { products: Product[] }; }

export default function KandaContent ({ quoteData }: TKandaContent) {
    const createKandaRedirect = useCreateRedirect();
    const updateQuote = useUpdateQuote();

    const onButtonClick = useCallback(async () => {
        try {
            await createKandaRedirect.mutateAsync({ body: getCreateKandaData(quoteData) });
            await updateQuote.mutateAsync({ id: quoteData.id, body: { paymentMethod: "OTHERS" } });
        } catch (e) {
            console.error(e);
        }
    }, [createKandaRedirect, updateQuote, quoteData]);

    return (
        <div className={styles.kandaContent}>
            <div className={styles.description}>
                <Icon icon={ICONS.FINANCE} className={styles.icon} />
                {`After clicking ‘Start Finance’ below, you will be redirected to Kanda to complete your application online.`}
            </div>
            <PayButton onClick={onButtonClick} label={"Start Finance"} />
            <div className={styles.footprint}>
                {`By submitting you agree to our `}
                <PrivacyPolicy />
            </div>
        </div>
    );
}