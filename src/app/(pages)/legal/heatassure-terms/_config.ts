export type HeatAssureSection = {
    id: string;
    title: string;
    content: string;
};

export const HEATASSURE_INTRO = `Please take a few minutes to read through these terms before you sign up. They set out what is included in your plan, what we will do for you, and what we would ask of you in return. If anything is unclear, just give us a call on **0333 577 0017** and we are happy to talk it through.`;

export const HEATASSURE_SECTIONS: HeatAssureSection[] = [
    {
        id: "sc01",
        title: "Who We Are",
        content: `Heatingology Ltd ("we", "us", "our") is a heating engineering company registered in England and Wales. We look after boilers and heating systems for homeowners across London, from routine annual services to emergency repairs.

If you need to get in touch:

- **Email:** hello@heatingology.co.uk
- **Phone:** 0333 577 0017
- **Post:** 167-169 Great Portland Street, 5th Floor, London, W1W 7LT

We are usually quickest to respond by email or phone during business hours.`,
    },
    {
        id: "sc02",
        title: "A Few Terms We Use Throughout",
        content: `To keep things readable, a few words appear throughout these terms with specific meanings:

- **"HeatAssure™"** means our subscription service, as described at heatingology.co.uk/heating-cover.
- **"Your plan" or "the plan"** means whichever of our Essential, Plus or Pro tiers you have signed up for.
- **"You" or "Member"** means the person who took out the subscription.
- **"Your property"** means the single home address you registered when you joined.
- **"Your boiler"** means the single domestic gas boiler at that address, registered at sign-up.
- **"A callout"** means a visit from one of our engineers to your property in response to a reported fault.
- **"The annual service"** means your included yearly gas boiler service, described in Section 5.
- **"Emergency callout"** means an urgent response visit available on the Pro plan outside standard booking windows.
- **"Stripe"** means the payment company we use to handle your monthly subscription billing.
- **"Renewal date"** means the same date each month on which your subscription renews, matching the day you originally signed up.`,
    },
    {
        id: "sc03",
        title: "What's in Your Plan",
        content: `HeatAssure™ comes in three tiers. Here is a quick summary of what each one covers, with more detail in the sections that follow.

| What's Included | Essential | Plus | Pro |
|---|---|---|---|
| Monthly price | £19/mo | £29/mo | £39/mo |
| Annual boiler service | ✓ | ✓ | ✓ |
| Priority booking | ✓ | ✓ | ✓ |
| Repair discount | 10% off | — | — |
| Labour charges | Apply | Included | Included |
| Priority callout (same or next day) | — | ✓ | ✓ |
| Parts discount | — | 15% off | 15% off |
| Emergency callouts | — | — | ✓ |
| £50 late response credit | — | — | ✓ |
| Callout limit per year | 3 | 4 | 6 |

**A note on fair use:** each plan has a cap on the number of callouts we cover in a given subscription year. This keeps the service running smoothly for everyone. Your annual boiler service does not count towards this limit. See Section 7 for more.

**3.1** The Essential plan (£19 per month) gives you your annual boiler service, priority booking ahead of non-members, and 10% off the cost of any repair visits. Labour charges still apply on callouts.

**3.2** The Plus plan (£29 per month) builds on Essential. Labour is included on standard repair callouts (up to your yearly limit), you get priority same day or next day response, and parts are discounted by 15%.

**3.3** The Pro plan (£39 per month) includes everything in Plus, along with emergency callouts, a £50 credit if we miss our response window (see Section 8), and a dedicated engineer for your area.

**3.4** Each plan covers one boiler at one property. If you move home or want to transfer your plan, please contact us first and we will do our best to accommodate you.`,
    },
    {
        id: "sc04",
        title: "What Is Not Covered",
        content: `We want to be upfront about this. HeatAssure™ is a maintenance and repair plan for your boiler, not a whole-home warranty. The following fall outside all plans:

- Boilers that are more than 15 years old at the time you join, unless we have agreed otherwise in writing.
- Boilers that have not had a service in the last 24 months, where we have assessed this increases the likelihood of failure.
- Damage or faults caused by misuse, accident, flooding, freezing, fire, or work carried out by someone other than a Heatingology engineer.
- Faults that existed before you joined, unless we have specifically agreed to include them in a written quote.
- Anything outside the boiler unit itself. Radiators, valves, pipework, cylinders, thermostats, controls and similar items are not covered unless your plan states otherwise.
- Gas meters, supply pipes, or any work that needs to be notified to or approved by the gas network.
- Flue liners, or condensate pipe blockages caused by poor original installation or lack of insulation on external pipes.
- Boiler replacements or new installations, which we would quote for separately.
- Problems arising from neglecting the wider property, such as persistent damp or poor ventilation.
- Parts that have been discontinued or would take more than 14 days to source. We will always let you know if this happens and provide a separate quote.
- Commercial or mixed-use properties.
- Any system that one of our engineers has assessed as unsafe to work on under Gas Safe rules, until the safety issue has been resolved.

If our engineer visits and finds the fault is something we cannot cover under your plan, they will explain why and give you a written quote to deal with it outside the plan. We would never leave you in the dark.

Labour on callouts under the Essential plan is charged at our standard rates at the time of the visit.`,
    },
    {
        id: "sc05",
        title: "Your Annual Boiler Service",
        content: `Every plan includes one boiler service per year, carried out by one of our Gas Safe registered engineers.

The service covers a visual check of the boiler and flue, combustion analysis, testing of controls and safety devices, cleaning of accessible parts where needed, and a service record for your files.

Your service needs to be used within each 12-month subscription period. We will get in touch during the year to arrange a convenient time. If it is not used before the year is up, it will not carry over, so it is worth booking it in good time.

Please make sure someone is in to give the engineer access on the day. If our engineer arrives and finds something that goes beyond routine servicing — say a part that needs replacing or a safety issue — they will let you know and provide a quote for any additional work.

We are not responsible for boiler breakdowns that occur between services, but we are always here to help if something goes wrong.`,
    },
    {
        id: "sc06",
        title: "Callouts and Response Times",
        content: `To book a callout under your plan, please contact us directly:

- **Phone:** 0333 577 0017
- **Email:** hello@heatingology.co.uk

If a callout is booked through a third-party platform or arranged directly with one of our engineers outside these channels, it will not be covered by your plan.

Here is what to expect in terms of response times. These are targets rather than guarantees, except for Pro plan members (see Section 8):

- **Essential:** your next available appointment, usually within 2 to 3 working days.
- **Plus:** priority booking, aiming for same day or next day where engineers are available.
- **Pro:** emergency response within 4 hours for urgent faults, and same or next day for standard callouts.

During busy periods, very cold snaps, bank holidays or times of unusually high demand, response times can be longer. We will always let you know as soon as we can if we are going to miss a target.

Please make sure someone aged 18 or over is at the property at the agreed time. If our engineer arrives and cannot get in, we may need to charge £35 for the wasted visit, which will appear on your next invoice.

If the same fault reappears within 30 days of an original repair, we will come back at no extra labour charge on Plus and Pro plans, as long as it is genuinely the same issue and not something new.`,
    },
    {
        id: "sc07",
        title: "Fair Use",
        content: `HeatAssure™ is a domestic plan, built around the typical needs of a home boiler. To keep things fair for all our members and to make sure we can get to everyone who needs us, each plan has a limit on the number of covered callouts per subscription year:

- **Essential:** up to 3 callouts per year, with labour charges applying on all of them.
- **Plus:** up to 4 callouts per year with no labour charge.
- **Pro:** up to 6 callouts per year covered under the plan.

Your annual service does not count towards this limit, and neither does a follow-up visit for the same fault within 30 days (see Section 6).

Once you reach your limit for the year, any further callouts will be charged at our standard rates. We will always let you know before sending an engineer if a callout will be chargeable.

In the unlikely event that we feel a plan is being used in a way that goes well beyond what is reasonable for a home, we will get in touch to discuss it. If the issue cannot be resolved, we may need to end the subscription as set out in Section 11.`,
    },
    {
        id: "sc08",
        title: "Pro Plan: The £50 Late Response Credit",
        content: `We know how stressful it is when your heating breaks down and you are waiting for help. Pro plan members have our commitment that if we miss the agreed response window for an emergency callout, we will credit your account £50.

For the credit to apply:

- The callout must have been logged with us directly by phone or email, not via a third party.
- We must have confirmed the response window in writing, by email or SMS, when the booking was made.
- The delay must have been on our side, not caused by you being unavailable, access issues, or something outside our control.
- The fault must be within the scope of your plan.

If all those conditions are met, we will apply the £50 credit to your Stripe account within 5 working days. It will come off your next month's subscription.

The credit is capped at one per calendar month and cannot be cashed out.`,
    },
    {
        id: "sc09",
        title: "Billing and Payment",
        content: `Your subscription renews automatically each month on your renewal date. Payment is handled by Stripe, a secure and widely used payment platform. By entering your payment details at sign-up, you are authorising Stripe to collect your monthly fee.

Your first payment goes out at sign-up, and your plan is active from that moment.

If a payment does not go through, Stripe will try again automatically. If it keeps failing, your plan benefits may be paused until it is sorted. We will send you an email so you are not left wondering what has happened.

Prices are inclusive of VAT where it applies. If we ever need to change our pricing, we will give you at least 30 days' notice by email before the new price comes into effect. If it does not work for you, you are free to cancel without any fuss.

We do not hold your card details ourselves, as that is all handled by Stripe. If you are curious about how they handle your data, their terms are at stripe.com/gb/legal. Please make sure your payment details on Stripe are kept up to date.`,
    },
    {
        id: "sc10",
        title: "Cancelling Your Plan",
        content: `You can cancel at any time. There is no penalty, no contract, and no awkward phone calls. To cancel:

- Log in to your account at heatingology.co.uk and cancel through the subscription page, or
- Email us at hello@heatingology.co.uk or call 0333 577 0017 and we will sort it for you.

Cancellation takes effect at the end of the billing period you are already in, and you will keep your plan benefits until then. We do not offer refunds for part of a month already paid.

If you change your mind within the first 14 days of signing up, you are entitled to a full refund under your right to cancel, as long as no visits have taken place. If we have already carried out a service or callout during that window, we will deduct a fair amount for the work done and refund the rest.

If you have already booked your annual service when you cancel, we will honour the appointment if it falls before the end of your final billing period.`,
    },
    {
        id: "sc11",
        title: "If We Need to End Your Plan",
        content: `We would much rather keep you as a member, but there are some circumstances where we may need to suspend or end a subscription:

- You have not kept to these terms and, where it is something fixable, have not resolved it within 14 days of us letting you know.
- The information you provided when you signed up turns out to have been inaccurate.
- Payment is still outstanding more than 30 days after your renewal date.
- We have good reason to believe the plan is being used fraudulently or in a way that is unreasonable.
- We stop offering HeatAssure™ in your area.

If we end your plan for any reason other than a breach on your part, we will give you at least 30 days' notice and refund the unused portion of your current billing period.`,
    },
    {
        id: "sc12",
        title: "Changing Your Plan",
        content: `You can upgrade at any time and the change takes effect straight away. The extra cost for the remaining days in your billing period will be charged to your account on a pro rata basis.

You can also downgrade at any time. The lower price takes effect from your next renewal date. We will not issue a partial refund for the current month if you downgrade during the billing cycle.

You can only have one active HeatAssure™ plan per property at any time.`,
    },
    {
        id: "sc13",
        title: "What You Can Expect From Us",
        content: `We will always:

- Send you qualified, Gas Safe registered engineers.
- Carry out all work to the relevant gas safety standards and industry codes of practice.
- Take reasonable care and apply proper skill to everything we do at your property.
- Let you know as quickly as we can if we need to rebook an appointment.
- Handle your personal information responsibly, in line with our Privacy Policy and UK GDPR.`,
    },
    {
        id: "sc14",
        title: "What We Ask of You",
        content: `As a HeatAssure™ member, we would ask you to:

- Give us accurate information when you sign up, including your boiler's make, model and age.
- Let us know if anything changes, such as your address, boiler, or contact details.
- Make sure there is reasonable access to your property when an engineer is coming.
- Avoid having anyone else carry out work on your boiler that would make it unsafe or invalidate its warranty.
- Report problems as soon as you notice them, rather than waiting and letting things get worse.
- Keep your payment details up to date on Stripe.
- Only use the plan for your registered home, not for any commercial purpose.`,
    },
    {
        id: "sc15",
        title: "Our Liability",
        content: `We are not trying to wriggle out of responsibility, but we do need to be clear about the limits of what we can be held accountable for.

Nothing in these terms removes or reduces your rights as a consumer under UK law, including the Consumer Rights Act 2015. We will always be responsible for death or personal injury caused by our negligence, or for any fraudulent conduct on our part.

Beyond those situations, our total liability to you in any 12-month period is capped at the total amount you have paid us for HeatAssure™ during that time.

We cannot accept liability for indirect losses, such as loss of income, business disruption, or data loss, or for anything that was not a foreseeable consequence of our actions.

We also cannot be held responsible for anything caused by circumstances outside our control, as covered in Section 17.

If we carry out a repair and the same fault later returns due to the general condition of an ageing boiler, our responsibility is limited to the specific repair we carried out, not the underlying state of the system.`,
    },
    {
        id: "sc16",
        title: "Complaints",
        content: `If something is not right, please tell us. We would rather know and have the chance to put it right.

You can reach us at:

- **Email:** hello@heatingology.co.uk
- **Phone:** 0333 577 0017

We will get back to you within 2 working days to acknowledge your complaint and aim to have it fully resolved within 10 working days. For anything more complex, we will keep you updated along the way.

If you are still not satisfied after we have done our best to help, you may have the option of going to an independent Alternative Dispute Resolution (ADR) scheme. Just ask us and we will point you in the right direction.`,
    },
    {
        id: "sc17",
        title: "Things Outside Our Control",
        content: `There are situations where we genuinely cannot deliver the service as planned, such as extreme weather, a national emergency, widespread industrial action, or a sudden shortage of parts. In those cases, we will not be in breach of these terms for any resulting delays.

If it happens, we will let you know straight away and do everything we reasonably can to get back to normal as quickly as possible.`,
    },
    {
        id: "sc18",
        title: "Your Data",
        content: `We take your privacy seriously. Heatingology Ltd processes personal data in line with UK GDPR and the Data Protection Act 2018. Our full Privacy Policy is on the website at heatingology.co.uk.

When you subscribe, we will share your name, address and boiler details with the engineers working on your account and with Stripe to handle billing. We do not sell your data to anyone, and we never will.`,
    },
    {
        id: "sc19",
        title: "General",
        content: `These terms, together with any written confirmation from us, make up the full agreement between you and Heatingology Ltd regarding HeatAssure™. If there is ever a conflict between these terms and something on the website, these terms take precedence.

We may need to update these terms from time to time. If we make any meaningful changes, we will let you know by email at least 30 days before they come into effect. Continuing with your subscription after that date means you are happy with the updated terms.

If we do not enforce a particular provision at a given moment, that does not mean we have given it up for good. If any part of these terms turns out to be unenforceable, the rest continues as normal.

These terms are governed by the law of England and Wales, and any disputes would be dealt with by the courts of England and Wales.`,
    },
    {
        id: "sc20",
        title: "Your Consumer Rights",
        content: `None of these terms affect your statutory rights under UK consumer law. You have rights under the Consumer Rights Act 2015, including the right to receive services carried out with reasonable care and skill, and nothing here takes those away.

Your 14-day right to cancel is set out in Section 10.

If you are ever uncertain about your rights, Citizens Advice (citizensadvice.org.uk) is a good free resource.`,
    },
];
