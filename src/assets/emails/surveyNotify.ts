import { Survey } from "@prisma/client";

enum PLACEHOLDERS {
    USERNAME = "{userName}",
    USER_EMAIL = "{userEmail}",
    CONTACT_NUMBER = "{contactNumber}",
    NOTE = "{note}",
    INTRO = "{intro}",
    IMAGES = "{images}"
}

const IMAGE_LABELS: { key: keyof Survey; label: string }[] = [
    { key: "gasMeterAreaImage", label: "Gas meter area" },
    { key: "frontOfPropertyImage", label: "Front of property" },
    { key: "proposedBoilerLocationImage", label: "Proposed boiler location" },
    { key: "areaBelowBoilerImage", label: "Area below boiler" },
    { key: "flueImage", label: "Flue" },
    { key: "areaAboveBoilerImage", label: "Area above boiler" },
];

const emailTemplate = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2>New Survey Request</h2>
  <p>${PLACEHOLDERS.INTRO}</p>

  <h3>User Details</h3>
  <ul>
    <li><strong>Name:</strong> ${PLACEHOLDERS.USERNAME}</li>
    <li><strong>Email:</strong> ${PLACEHOLDERS.USER_EMAIL}</li>
    <li><strong>Contact Number:</strong> ${PLACEHOLDERS.CONTACT_NUMBER}</li>
  </ul>

  ${PLACEHOLDERS.NOTE}

  ${PLACEHOLDERS.IMAGES}

  <p>Please follow up if necessary.</p>
</div>
`;

export function getSurveyNotify ({ surveyData, contactOnly }: { surveyData: Survey; contactOnly: boolean }) {
    const noteHtml = surveyData.note
        ? `<h3>Note</h3><p>${surveyData.note}</p>`
        : "";

    const uploadedImages = IMAGE_LABELS.filter(({ key }) => surveyData[key]);
    const imagesHtml = uploadedImages.length > 0
        ? `<h3>Uploaded Images</h3><ul>${uploadedImages.map(({ key, label }) =>
            `<li><strong>${label}:</strong> <a href="${surveyData[key]}">${surveyData[key]}</a></li>`
        ).join("")}</ul>`
        : "";

    return emailTemplate
        .replace(PLACEHOLDERS.USERNAME, `${surveyData.firstName} ${surveyData.lastName}`)
        .replace(PLACEHOLDERS.USER_EMAIL, surveyData.email ?? "")
        .replace(PLACEHOLDERS.CONTACT_NUMBER, surveyData.contactNumber ?? "")
        .replace(PLACEHOLDERS.NOTE, noteHtml)
        .replace(PLACEHOLDERS.IMAGES, imagesHtml)
        .replace(PLACEHOLDERS.INTRO, contactOnly
            ? "A user has requested a callback."
            : "A user has submitted an eSurvey request.");
}
