import classNames from "classnames";
import styles from './style.module.scss';
import Image from "..";

type TBanner = {
    className?: string;
    contentClassName?: string;
    bannerUrl: string;
    alt: string;
    children?: React.ReactNode;
}

export default function Banner ({ className, bannerUrl, alt, children, contentClassName }: TBanner) {
    return (
        <section role="banner" className={classNames(className, styles.banner)}>
            <Image
                src={bannerUrl}
                fill
                alt={alt}
                sizes="100%"
            />
            {
                children &&
                    <section className={classNames(styles.contentContainer, contentClassName)}>
                        {children}
                    </section>
            }
        </section>
    );
}