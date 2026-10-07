"use client";
import ConsentDialog from "@/components/Dialog/CornerSheets/Cookie";
import "../globals.scss";
import PageNav from "@/components/Menu/PageMenu";
import { Suspense } from "react";
import Loading from "../loading";

export default function PageLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div>
            <PageNav />
            <Suspense fallback={<Loading />}>
                {children}
            </Suspense>
            <ConsentDialog />
        </div>
    );
}
