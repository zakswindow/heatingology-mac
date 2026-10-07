"use client";

import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import Image from "@/components/Image";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";
import { useState } from "react";

export default function CallbackCard ({ image, headline, subHeadline, details }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className={styles.card}>
            <Image className={styles.banner} src={image} alt={headline} width={335} height={251} />
            <div className={styles.metadata}>
                <h3 className={styles.headline}> { headline }</h3>
                <p className={styles.subHeadline}> { subHeadline }</p>
                <ul className={styles.details}>
                    {
                        details
                    }
                </ul>
                <div className={styles.spacer} />
                <Button className={styles.button} onClick={() => setIsOpen(true)}>
                    <Icon icon={ICONS.PHONE} />
                    Request Callback
                </Button>
                <RequestSurveyDialog
                    contactOnly={true}
                    rootProps={{ open: isOpen, onOpenChange: setIsOpen }}
                />
            </div>
        </article>
    );
}
