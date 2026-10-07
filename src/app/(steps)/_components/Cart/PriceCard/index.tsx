import { ArchiveIcon } from "@radix-ui/react-icons";
import styles from "./style.module.scss";
import NoteCard from "../../../../../components/Card/NoteCard";
import PriceBox from "@/components/Card/PriceBox";
import { Product } from "@prisma/client";

type TBookingDetailsDateCard = {
    content: {
        products: Product[];
        price: number;
        notes: Record<string, string>[];
    }
}

export default function BookingDetailsPriceCard ({ content }: TBookingDetailsDateCard) {
    const [firstProduct] = content.products ?? [];

    // TODO: Include more than one main product?
    return (
        <PriceBox product={firstProduct} price={content.price} />
    );
}