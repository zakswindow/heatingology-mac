import { format } from "date-fns";
import styles from "./style.module.scss";

type TBookingDetailsDateCard = {
    content: {
        date: Date;
        time: string;
    }; 
}

export default function BookingDetailsDateCard ({ content }: TBookingDetailsDateCard) {
    const { date, time } = content;

    return (
        <article className={styles.card}>
            <span className={styles.dateTile}>
                <div className={styles.day}> {format(date, "iii")} </div>
                <div className={styles.date}> {format(date, "do")} </div>
            </span>
            <div className={styles.details}>
                <p className={styles.date}> { format(date, "iiii do MMMM, yyyy" )}</p>
                <p className={styles.time}> { time } </p>
            </div>
        </article>
    );
}