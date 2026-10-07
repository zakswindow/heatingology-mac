import Logo from "@/components/Image/Logo";
import { FOOTER_DATA } from "./_config";
import FooterSection from "./FooterSection";
import styles from './style.module.scss';
import { LOGOS } from "@/lib/_imageMap";
import Image from "@/components/Image";

export default function Footer ({ className }: { className?: string }) {
    const trademarkNote = "©2025 Heatingology Limited. All rights reserved.";
    const footerNote = "Heatingology is trading name of Heatingology Limited. Heatingology Limited is registered in England and Wales No. 13808029. Registered office is 167-169 Great Portland Street, 5th Floor, London W1W 5PF.";

    return (
        <footer
            className={`${styles.footer}${className ? ` ${className}` : ""}`}>
            <nav
                className={ styles.footerNav } aria-label="Footer site map">
                <Logo />
                <div className={styles.footerMap}>
                    {
                        FOOTER_DATA.map((item) => {
                            return (
                                <FooterSection
                                    key={`footer-${item.title}`} data={item} />
                            );
                        })
                    }
                </div>
                <Image className={styles.gasSafe} width={84} height={121} src={LOGOS.GAS_SAFE} alt="Gas Safe" />
            </nav>
            <section className={styles.footprints}>
                <p> { trademarkNote }</p>
                <p> { footerNote }</p>
            </section>
        </footer>
    );
}