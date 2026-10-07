import Cookies from "js-cookie";

export function getConsent () {
    return Cookies.get("hg-consent");
}

export function setConsent (value: string) {
    return Cookies.set("hg-consent", value, {
        expires: 365,
        path: "/" 
    });
}