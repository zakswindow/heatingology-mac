import type { Metadata } from "next";
import "./globals.scss";
// import 'path/to/embla-carousel.css';
import Footer from "@/components/Section/Footer/FooterWrapper";
import { Providers } from "./providers";
import { Baloo_2, Plus_Jakarta_Sans } from 'next/font/google';
import { Suspense } from "react";
import Loading from "./loading";
import styles from "./style.module.scss";
import Script from "next/script";

const baloo2 = Baloo_2({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-baloo-2',
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'], // Available weights
    variable: '--font-plus-jakarta-sans',
    fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif']
});

export const metadata: Metadata = {
    metadataBase: new URL("https://www.heatingology.co.uk"),
    title: {
        default: "Heatingology | Boiler Installation, Repair & Servicing London & Essex",
        template: "%s | Heatingology",
    },
    description:
        "Heating solutions across Islington, Camden, Hackney, Enfield, Barnet, Newham, Havering, Bromley, Lewisham, Thurrock & more. Fixed pricing, Gas Safe engineers, 12-month warranty.",
    openGraph: {
        siteName: "Heatingology",
        locale: "en_GB",
        type: "website",
        images: [{ url: "https://assets.heatingology.com/landing-page/og-image.jpg", width: 1200, height: 630, alt: "Heatingology — UK Heating Solutions" }],
    },
    twitter: { card: "summary_large_image" },
    icons: {
        icon: "https://assets.heatingology.com/landing-page/favicon.svg",
        shortcut: "https://assets.heatingology.com/landing-page/favicon.svg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html
            lang="en"
            className={`${baloo2.variable} ${plusJakartaSans.variable}`}
        >
            <body>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-XX696C51FK"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-XX696C51FK');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Heatingology",
                        "url": "https://www.heatingology.co.uk",
                        "email": "customerservice@heatingology.co.uk",
                        "areaServed": [
                            { "@type": "City", "name": "Islington" },
                            { "@type": "City", "name": "Camden" },
                            { "@type": "City", "name": "Barnet" },
                            { "@type": "City", "name": "Hendon" },
                            { "@type": "City", "name": "Hackney" },
                            { "@type": "City", "name": "Tower Hamlets" },
                            { "@type": "City", "name": "Newham" },
                            { "@type": "City", "name": "Enfield" },
                            { "@type": "City", "name": "Haringey" },
                            { "@type": "City", "name": "Chingford" },
                            { "@type": "City", "name": "Barking and Dagenham" },
                            { "@type": "City", "name": "Havering" },
                            { "@type": "City", "name": "Hornchurch" },
                            { "@type": "City", "name": "Bromley" },
                            { "@type": "City", "name": "Biggin Hill" },
                            { "@type": "City", "name": "Lewisham" },
                            { "@type": "City", "name": "Thurrock" },
                        ],
                        "address": { "@type": "PostalAddress", "addressLocality": "Essex", "addressCountry": "GB" },
                        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "1229" },
                        "priceRange": "££",
                        "knowsAbout": ["Boiler Installation", "Boiler Repair", "Boiler Servicing", "Heat Pump Installation", "EV Charger Installation"],
                    }) }}
                />
                <div
                    className={styles.rootLayout}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh" 
                    }}>
                    <main className={styles.pageWrapper}>
                        <Providers>
                            <Suspense fallback={<Loading />}>
                                {children}
                            </Suspense>
                        </Providers>
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
