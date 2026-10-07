export type TPaymentOption = {
    apr: number;
    apr_type: string;
    charge: number;
    deferred_duration: number;
    duration: number;
    enabled: boolean;
    fee: number;
    finance_types: string[];
    max_deposit_pct: number;
    max_deposit_value: number;
    max_job_value: number;
    min_charge: number;
    min_deposit_pct: number;
    min_deposit_value: number;
    min_job_value: number;
    name: string;
    provider: string;
};