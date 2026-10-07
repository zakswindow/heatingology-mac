"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/heating-cover";

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await fetch("/api/heating-cover-auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password, from }),
        });

        if (res.ok) {
            const { redirectTo } = await res.json();
            router.push(redirectTo);
        } else {
            setError("Incorrect password. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8f9fa",
            fontFamily: "var(--font-plus-jakarta-sans, system-ui, sans-serif)",
        }}>
            <div style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "48px 40px",
                width: "100%",
                maxWidth: "400px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                textAlign: "center",
            }}>
                <Image
                    src="https://assets.heatingology.com/landing-page/favicon.svg"
                    alt="Heatingology"
                    width={48}
                    height={48}
                    style={{ marginBottom: "24px" }}
                />
                <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>
                    HeatAssure Preview
                </h1>
                <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>
                    This page is password protected. Enter the access password to continue.
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            padding: "12px 16px",
                            borderRadius: "8px",
                            border: error ? "1.5px solid #e53e3e" : "1.5px solid #e2e8f0",
                            fontSize: "15px",
                            outline: "none",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    />
                    {error && (
                        <p style={{ color: "#e53e3e", fontSize: "13px", margin: 0 }}>{error}</p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#E8612C",
                            color: "#fff",
                            fontSize: "15px",
                            fontWeight: 600,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? "Verifying…" : "Access Preview"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function HeatassureLoginPage() {
    return (
        <Suspense>
            <LoginForm />
        </Suspense>
    );
}
