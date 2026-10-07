"use client";
import NotFoundImage from "@/assets/error_404.svg";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import SimpleMenu from "@/components/Menu/SimpleMenu";

export default function NotFound () {
    const title = `Something's Missing`;
    const message = `Sorry, the page you’re looking for doesn’t exist.`;
    return (
        <>
            <SimpleMenu />
            <main className={styles.page}>
                <div className={styles.wrapper}>
                    <NotFoundImage className={styles.image}/>
                    <div className={styles.title}>{title}</div>
                    <p className={styles.message}>{message}</p>
                    <Link href="/">
                        <Button className={styles.button}> 
                            <Icon icon={ICONS.ARROW_LEFT} />    
                            Back to home 
                        </Button>
                    </Link>
                </div>
            </main>
        </>
    );
}