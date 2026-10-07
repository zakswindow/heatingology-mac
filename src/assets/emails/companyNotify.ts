import { ProductType, Quote } from "@prisma/client";

enum PLACEHOLDERS {
    QUOTE_ID = "{orderId}",
    USERNAME = "{userName}",
    USER_EMAIL = "{userEmail}",
    SERVICE = "{service}",
    CONTENT = "{content}"
}

function getServiceName (productType: ProductType) {
    switch (productType) {
        case ProductType.boiler:
            return "New Boiler installation";
        case ProductType.boiler_repair:
            return "Boiler Repair";
        case ProductType.boiler_service:
            return "Boiler Service";
        case ProductType.heatPump:
            return "New Heat Pump installation";
        case ProductType.ev_charger:
            return "New EV Charger installtion";
        default:
            return "";
    }
}

function renderContent (content: string): string {
    try {
        const parsed = JSON.parse(content);
        const rows = (Object.values(parsed) as { question: string; inputValue: unknown }[])
            .map((item) =>
                `<dt><strong>${item.question}</strong></dt><dd>${item.inputValue}</dd>`
            )
            .join("\n");
        return `<dl>${rows}</dl>`;
    } catch {
        return `<pre>${content}</pre>`;
    }
}

const emailTemplate = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Checkout Notification</h2>
      <p>A user has completed a purchase on your platform.</p>

      <h3>Order Details</h3>
      <ul>
        <li><strong>Order ID:</strong> ${PLACEHOLDERS.QUOTE_ID}</li>
        <li><strong>Service Purchased:</strong> ${PLACEHOLDERS.SERVICE}</li>
      </ul>

      <h3>User Details</h3>
      <ul>
        <li><strong>Name:</strong> ${PLACEHOLDERS.USERNAME}</li>
        <li><strong>Email:</strong> ${PLACEHOLDERS.USER_EMAIL}</li>
      </ul>

      <h3>Quote Content</h3>
      ${PLACEHOLDERS.CONTENT}

      <p>Please follow up if necessary.</p>
    </div>
`;

export function getCompanyNotify ({ quoteData }: { quoteData: Quote }) {
    return emailTemplate
        .replace(PLACEHOLDERS.QUOTE_ID, quoteData.id)
        .replace(PLACEHOLDERS.USERNAME, `${quoteData.firstName} ${quoteData.lastName}`)
        .replace(PLACEHOLDERS.USER_EMAIL, quoteData.email ?? "")
        .replace(PLACEHOLDERS.SERVICE, getServiceName(quoteData.productType))
        .replace(PLACEHOLDERS.CONTENT, renderContent(quoteData.content));
}
