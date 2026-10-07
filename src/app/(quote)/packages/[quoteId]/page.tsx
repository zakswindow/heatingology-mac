import styles from './style.module.scss';
import { prisma } from '@/lib/prisma';
import { ProductType } from '@prisma/client';
import BoilerRepair from './BoilerRepair';
import BoilerServicing from './BoilerService';
import Boiler from './Boiler';
import HeatPump from './HeatPump';
import EvCharger from './EvCharger';
import { Suspense } from 'react';
import Loading from '@/app/loading';

// Results for New Boiler, New Heat pump, New EV Charger

export default async function PackagesPage ({ params }) {
    const { quoteId } = await params;
    
    const quoteData = await prisma.quote.findUnique({ where: { id: quoteId } });
    const quoteType = quoteData?.productType;

    function renderPage (type) {
        switch (type) {
            case ProductType.boiler_repair:
                return <BoilerRepair quoteData={quoteData} />;
            case ProductType.boiler_service:
                return <BoilerServicing quoteData={quoteData} />;
            case ProductType.boiler:
                return <Boiler quoteData={quoteData} />;
            case ProductType.heatPump:
                return <HeatPump quoteData={quoteData} />;
            case ProductType.ev_charger:
                return <EvCharger quoteData={quoteData} />;
        }
    }

    return (
        <Suspense fallback={<Loading />}>
            <section className={styles.page}>
                {
                    renderPage(quoteType)
                }
            </section>
        </Suspense>
    );
}