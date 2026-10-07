"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getPlan } from "@/lib/data/heatassure-plans";
import { useGetAddressByPostcode, useGetAddressById } from "@/lib/_queries/postcode.query";
import { trackEvent } from "@/lib/analytics";
import style from "../style.module.scss";

const steps = ["Choose Plan", "Your Details", "Payment", "Confirmation"];

type AddressResult = { id: string; address: string };

export default function HeatAssureCheckoutDetails() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planKey = searchParams.get("plan") ?? "plus";
    const plan = getPlan(planKey);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        agreed: false,
    });

    // Address fields — populated by search or typed manually
    const [address, setAddress] = useState({
        postcode: "",
        addressLine1: "",
        addressLine2: "",
        addressCity: "",
        addressCounty: "",
    });

    // Address search state
    const [postcodeSearch, setPostcodeSearch] = useState("");
    const [selectedId, setSelectedId] = useState("");
    const [isManual, setIsManual] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { data: searchResponse } = useGetAddressByPostcode({ postcode: postcodeSearch });
    const searchResults: AddressResult[] = searchResponse?.result ?? [];

    const { data: addressResponse } = useGetAddressById({ id: selectedId });

    useEffect(() => {
        if (addressResponse?.result) {
            const r = addressResponse.result;
            setAddress({
                postcode: r.postcode ?? "",
                addressLine1: r.line_1 ?? "",
                addressLine2: r.line_2 ?? "",
                addressCity: r.town_or_city ?? "",
                addressCounty: r.county ?? "",
            });
            setIsManual(true);
            setDropdownOpen(false);
        }
    }, [addressResponse]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const onSelectAddress = (item: AddressResult) => {
        setSelectedId(item.id);
        setPostcodeSearch(item.address);
        setDropdownOpen(false);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullAddress = [address.addressLine1, address.addressLine2, address.addressCity, address.addressCounty]
            .filter(Boolean)
            .join(", ");
        sessionStorage.setItem("ha_email", form.email);
        sessionStorage.setItem("ha_name", `${form.firstName} ${form.lastName}`);
        sessionStorage.setItem("ha_phone", form.phone);
        sessionStorage.setItem("ha_postcode", address.postcode);
        sessionStorage.setItem("ha_address", fullAddress);
        trackEvent('add_contact_info', { plan: plan.key });
        router.push(`/heating-cover/checkout/payment?plan=${plan.key}`);
    };

    const isAddressFilled = Boolean(address.addressLine1 && address.postcode);

    return (
        <div className={style.checkoutPage}>
            <div className={style.inner}>

                {/* Progress stepper */}
                <div className={style.stepper}>
                    {steps.map((label, i) => {
                        const isActive = i === 1;
                        const isCompleted = i < 1;
                        return (
                            <div key={label} className={style.stepItem}>
                                {i > 0 && (
                                    <span className={`${style.stepConnector} ${isCompleted || isActive ? style.stepConnectorActive : ""}`} />
                                )}
                                <div className={`${style.stepPill} ${isActive ? style.stepPillActive : ""} ${isCompleted ? style.stepPillCompleted : ""}`}>
                                    <span className={`${style.stepNum} ${!isActive && !isCompleted ? style.stepNumInactive : ""}`}>
                                        {i + 1}
                                    </span>
                                    <span>{label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Heading */}
                <h1 className={style.heading}>Your Details</h1>

                {/* Plan reminder */}
                <div className={style.planReminderBar}>
                    <span className={style.planReminderName}>HeatAssure™ {plan.name}</span>
                    <span className={style.planReminderPrice}>{plan.price}/month</span>
                </div>

                {/* Form */}
                <form onSubmit={onSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "inherit" }}>
                        <div className={style.formGrid}>
                            {/* Name */}
                            <div className={style.formField}>
                                <label className={style.formLabel} htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className={style.formInput}
                                    placeholder="John"
                                    value={form.firstName}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className={style.formField}>
                                <label className={style.formLabel} htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className={style.formInput}
                                    placeholder="Smith"
                                    value={form.lastName}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className={`${style.formField} ${style.formFull}`}>
                                <label className={style.formLabel} htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className={style.formInput}
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className={`${style.formField} ${style.formFull}`}>
                                <label className={style.formLabel} htmlFor="phone">Phone Number</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    className={style.formInput}
                                    placeholder="07700 000000"
                                    value={form.phone}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            {/* Address search */}
                            {!isManual && (
                                <div className={`${style.formField} ${style.formFull} ${style.addressSearchWrapper}`} ref={searchRef}>
                                    <label className={style.formLabel}>Property Address</label>
                                    <input
                                        type="text"
                                        className={style.formInput}
                                        placeholder="Start typing your postcode or address…"
                                        value={postcodeSearch}
                                        onChange={(e) => {
                                            setPostcodeSearch(e.target.value);
                                            setDropdownOpen(true);
                                        }}
                                        onFocus={() => setDropdownOpen(true)}
                                        autoComplete="off"
                                    />
                                    {dropdownOpen && searchResults.length > 0 && (
                                        <div className={style.addressDropdown}>
                                            {searchResults.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={style.addressDropdownItem}
                                                    onMouseDown={() => onSelectAddress(item)}
                                                >
                                                    {item.address}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        className={style.addressToggle}
                                        onClick={() => setIsManual(true)}
                                    >
                                        Enter address manually
                                    </button>
                                </div>
                            )}

                            {/* Manual address fields */}
                            {isManual && (
                                <>
                                    <div className={`${style.formField} ${style.formFull}`}>
                                        <label className={style.formLabel} htmlFor="addressLine1">Address Line 1</label>
                                        <input
                                            id="addressLine1"
                                            name="addressLine1"
                                            type="text"
                                            className={style.formInput}
                                            placeholder="123 Example Street"
                                            value={address.addressLine1}
                                            onChange={onAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className={`${style.formField} ${style.formFull}`}>
                                        <label className={style.formLabel} htmlFor="addressLine2">Address Line 2 <span style={{ fontWeight: 400, color: "#aaa" }}>(optional)</span></label>
                                        <input
                                            id="addressLine2"
                                            name="addressLine2"
                                            type="text"
                                            className={style.formInput}
                                            placeholder="Flat 2"
                                            value={address.addressLine2}
                                            onChange={onAddressChange}
                                        />
                                    </div>
                                    <div className={style.formField}>
                                        <label className={style.formLabel} htmlFor="addressCity">City / Town</label>
                                        <input
                                            id="addressCity"
                                            name="addressCity"
                                            type="text"
                                            className={style.formInput}
                                            placeholder="London"
                                            value={address.addressCity}
                                            onChange={onAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className={style.formField}>
                                        <label className={style.formLabel} htmlFor="postcode">Postcode</label>
                                        <input
                                            id="postcode"
                                            name="postcode"
                                            type="text"
                                            className={style.formInput}
                                            placeholder="N1 1AA"
                                            value={address.postcode}
                                            onChange={onAddressChange}
                                            required
                                        />
                                    </div>
                                    <div className={`${style.formField} ${style.formFull}`}>
                                        <button
                                            type="button"
                                            className={style.addressToggle}
                                            onClick={() => {
                                                setIsManual(false);
                                                setPostcodeSearch("");
                                                setSelectedId("");
                                                setAddress({ postcode: "", addressLine1: "", addressLine2: "", addressCity: "", addressCounty: "" });
                                            }}
                                        >
                                            Search for address instead
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className={style.checkboxRow}>
                            <input
                                type="checkbox"
                                name="agreed"
                                id="agreed"
                                checked={form.agreed}
                                onChange={onChange}
                                required
                            />
                            <label htmlFor="agreed">
                                I agree to the{" "}
                                <a href="/legal/heatassure-terms" target="_blank" rel="noopener noreferrer">
                                    HeatAssure™ Terms &amp; Conditions
                                </a>{" "}
                                and authorise Heatingology to manage my monthly subscription.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={style.ctaButton}
                            disabled={!isManual || !isAddressFilled}
                            style={(!isManual || !isAddressFilled) ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
                        >
                            Continue to Payment
                        </button>
                    </div>
                </form>

                {/* Security note */}
                <div className={style.securityRow}>
                    <img src="/heatassure/checkout/icon-lock.svg" alt="" width={14} height={14} />
                    <span>Secure &amp; encrypted</span>
                    <span className={style.securityDot}>·</span>
                    <span>No payment taken on this page</span>
                </div>

                <Link href={`/heating-cover/checkout?plan=${plan.key}`} className={style.backLink}>
                    ← Back
                </Link>

            </div>
        </div>
    );
}
