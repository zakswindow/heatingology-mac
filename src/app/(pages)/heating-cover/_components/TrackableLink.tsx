"use client";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

type Props = {
    href: string;
    className?: string;
    eventName: string;
    eventParams?: Record<string, unknown>;
    children: React.ReactNode;
};

export default function TrackableLink({ href, className, eventName, eventParams, children }: Props) {
    return (
        <Link href={href} className={className} onClick={() => trackEvent(eventName, eventParams)}>
            {children}
        </Link>
    );
}
