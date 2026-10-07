export const FAQ_CATEGORIES = {
    ALL:            { id: "faq/all",            label: "View All" },
    GENERAL:        { id: "faq/general",         label: "General" },
    BOILER_INSTALL: { id: "faq/boiler-install",  label: "New Boiler" },
    BOILER_REPAIR:  { id: "faq/boiler-repair",   label: "Boiler Repair" },
    BOILER_SERVICE: { id: "faq/boiler-service",  label: "Boiler Service" },
    EV_CHARGER:     { id: "faq/ev-charger",      label: "EV Charger" },
    HEAT_PUMP:      { id: "faq/heat-pump",       label: "Heat Pump" },
    PAYMENT:        { id: "faq/payment",         label: "Payment" },
};

export const FAQ_CATEGORIES_SELECT = [
    FAQ_CATEGORIES.ALL,
    FAQ_CATEGORIES.GENERAL,
    FAQ_CATEGORIES.BOILER_INSTALL,
    FAQ_CATEGORIES.BOILER_REPAIR,
    FAQ_CATEGORIES.BOILER_SERVICE,
    FAQ_CATEGORIES.EV_CHARGER,
    FAQ_CATEGORIES.HEAT_PUMP,
    FAQ_CATEGORIES.PAYMENT,
];

export const FAQS = [
    // ─── General ────────────────────────────────────────────────────────────
    {
        id: "faq-g01",
        question: "Are your engineers Gas Safe registered?",
        answer: "Yes — every engineer we send to your home is Gas Safe registered. Gas Safe is the official UK gas registration body, and it is a legal requirement for any engineer working on gas appliances to hold a valid registration. You can always ask to see our engineer's Gas Safe ID card before they begin any work.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g02",
        question: "What areas of the UK do you cover?",
        answer: "We currently cover a wide range of postcodes across England. When you start a quote or booking, we ask for your postcode to confirm availability in your specific area. If we do not yet cover your location, we will let you know and can add you to our waiting list as we continue to expand.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g03",
        question: "I have a mobility issue. Do you take extra care?",
        answer: "Absolutely. We strive to provide exceptional service to every customer and place particular emphasis on supporting senior citizens and those with disabilities. If you or someone you know requires additional care or assistance, please let us know in advance and we will make the necessary arrangements to ensure their comfort and well-being throughout the visit.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g04",
        question: "Do you have liability insurance?",
        answer: "Yes, all our engineers are fully covered by public liability insurance. This provides added protection and peace of mind for both our engineers and our customers in the unlikely event that any damage occurs during a visit.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g05",
        question: "Why do you need my postcode upfront?",
        answer: "We ask for your postcode for three key reasons: first, to confirm our services are available in your area; second, to assign the closest available engineer, reducing travel time and getting to you faster; and third, to help us schedule appointments and plan routes efficiently. Your postcode is handled in strict confidence and in compliance with GDPR.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g06",
        question: "Do I need to arrange parking for your engineer?",
        answer: "We kindly ask you to arrange suitable parking near your property where possible. If parking cannot be arranged, our engineer will find a space themselves and any parking charges will be added to your final bill.",
        category: FAQ_CATEGORIES.GENERAL.id
    },
    {
        id: "faq-g07",
        question: "How do I get in touch if I have a problem?",
        answer: "You can reach our customer service team by email at customerservice@heatingology.co.uk. We aim to respond to all enquiries within one business day. For urgent matters, you can also call our office number listed on the website.",
        category: FAQ_CATEGORIES.GENERAL.id
    },

    // ─── New Boiler Installation ─────────────────────────────────────────────
    {
        id: "faq-bi01",
        question: "What boiler brands do you supply and install?",
        answer: "We supply and install leading UK boiler brands including Worcester Bosch, Vaillant, Baxi, Ideal, and Viessmann. During the quote process, we recommend the most suitable brand and model based on your property size, hot water demand, and budget. All boilers we fit are A-rated for energy efficiency.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi02",
        question: "How long does a new boiler installation take?",
        answer: "A straightforward like-for-like boiler swap typically takes one full day (6–8 hours). If the installation involves moving the boiler to a new location, upgrading pipework, or converting from a system or heat-only boiler to a combi, it may take up to two days. Your engineer will give you a realistic timeline before starting.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi03",
        question: "Do you remove and dispose of my old boiler?",
        answer: "Yes. Removal and responsible disposal of your old boiler is included as standard. Our engineers will take the old unit away and dispose of it in accordance with current waste regulations — there is nothing extra for you to arrange.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi04",
        question: "What warranty do I get on a new boiler?",
        answer: "You receive two layers of warranty: a manufacturer's parts warranty of up to 15 years (depending on the brand and model selected), and a 12-month workmanship warranty from Heatingology covering the installation labour. To keep the manufacturer's warranty valid, the boiler must be serviced annually by a Gas Safe engineer.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi05",
        question: "Will I need a home survey before installation?",
        answer: "For most standard installations a detailed online quote is sufficient. However, if your property has non-standard pipework, an unusual flue route, or you are switching boiler type (e.g. from heat-only to combi), we may arrange a free pre-installation survey to ensure everything goes smoothly on the day.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi06",
        question: "Can you convert my system or heat-only boiler to a combi?",
        answer: "Yes, we can convert from a system or regular (heat-only) boiler to a combi boiler. This typically involves removing the hot water cylinder and cold water tanks in the loft, and re-routing pipework. We will advise whether your property's water pressure and pipe sizes are suitable during the quoting stage.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi07",
        question: "Do I need to be home for the full installation?",
        answer: "Yes, we do require an adult (aged 18 or over) to be present throughout the installation. This is for safety reasons and so the engineer can walk you through the new controls and answer any questions once the work is complete.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },
    {
        id: "faq-bi08",
        question: "Will the engineer tidy up and test the boiler before leaving?",
        answer: "Yes. Our engineers always clean up their work area before leaving. Once the installation is complete, the engineer will run a full system test, balance the radiators, set the controls to your preferences, and walk you through how to use your new boiler.",
        category: FAQ_CATEGORIES.BOILER_INSTALL.id
    },

    // ─── Boiler Repair ───────────────────────────────────────────────────────
    {
        id: "faq-br01",
        question: "How much does a boiler repair cost?",
        answer: "Our boiler repair starts from an £85 diagnostic fee, which covers the engineer's visit and fault diagnosis. If parts or additional labour are required, these are quoted and agreed with you before any further work begins. We believe in transparent pricing with no hidden charges.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },
    {
        id: "faq-br02",
        question: "Can you do same-day or next-day repairs?",
        answer: "We aim to offer same-day or next-day appointments wherever possible, subject to engineer availability in your area. When you book online you will see the earliest available slots so you can pick the time that suits you best.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },
    {
        id: "faq-br03",
        question: "What if the engineer cannot fix my boiler in one visit?",
        answer: "Our engineers carry a wide range of common spare parts in their vans, so most repairs are completed on the first visit. If a specialist part is needed, it is ordered from our national distribution centre immediately and typically arrives the next working day. We will keep you updated throughout and arrange a return visit as quickly as possible.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },
    {
        id: "faq-br04",
        question: "Is there a warranty on boiler repair work?",
        answer: "Yes. All repair work carried out by Heatingology is backed by a 12-month warranty covering both parts and labour. If the same fault recurs within 12 months we will return and fix it at no additional cost.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },
    {
        id: "faq-br05",
        question: "My boiler keeps breaking down — should I repair or replace it?",
        answer: "As a general guide, if your boiler is over 10–12 years old and has required multiple repairs in the past two years, a replacement is often more cost-effective in the long run. A new A-rated boiler is also significantly more energy-efficient, which can lower your gas bills. Our engineers will give you an honest assessment and a no-obligation quote for both options so you can decide.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },
    {
        id: "faq-br06",
        question: "What types of boiler faults can you diagnose and fix?",
        answer: "Our Gas Safe engineers can diagnose and repair a wide range of faults including no heating or hot water, low boiler pressure, ignition failures, thermostat issues, kettling noises, faulty diverter valves, pump failures, and error codes on most major brands. If you are unsure whether your fault is covered, contact us and we will advise.",
        category: FAQ_CATEGORIES.BOILER_REPAIR.id
    },

    // ─── Boiler Service ──────────────────────────────────────────────────────
    {
        id: "faq-bs01",
        question: "How much does a boiler service cost?",
        answer: "Our standard annual boiler service starts from £125. The price is fixed and includes everything listed in the service checklist — there are no hidden add-ons. You will receive a full service report and Gas Safety certificate at the end.",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },
    {
        id: "faq-bs02",
        question: "What does a boiler service include?",
        answer: "A full Heatingology boiler service covers: visual inspection of the boiler and controls; checking the flue and ventilation; inspecting the heat exchanger and burner; testing the gas pressure and flow rate; checking safety devices including the pressure relief valve; cleaning key components; and completing a Gas Safety record (CP12 certificate).",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },
    {
        id: "faq-bs03",
        question: "How often should I get my boiler serviced?",
        answer: "We recommend having your boiler serviced once every 12 months, ideally in late summer or early autumn before the heating season begins. Regular servicing keeps your boiler running safely and efficiently, helps prevent unexpected breakdowns, and is a requirement to maintain most manufacturer warranties.",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },
    {
        id: "faq-bs04",
        question: "Will I receive a Gas Safety certificate after the service?",
        answer: "Yes. After every boiler service we issue a Gas Safety record (also known as a CP12 certificate). This document confirms that your gas appliances have been checked and are operating safely. Landlords are legally required to have this certificate and renew it annually.",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },
    {
        id: "faq-bs05",
        question: "How long does a boiler service take?",
        answer: "A standard boiler service typically takes between 45 and 90 minutes, depending on the boiler type and its condition. We will give you an accurate arrival window and our engineers aim to work efficiently so you can get on with your day.",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },
    {
        id: "faq-bs06",
        question: "Can skipping an annual service void my boiler's manufacturer warranty?",
        answer: "Yes, in most cases. Manufacturers such as Worcester Bosch, Vaillant, and Baxi require evidence of annual servicing by a Gas Safe registered engineer to honour their extended warranties. Missing even one year's service can invalidate your cover. Booking with Heatingology ensures you receive a signed service record to keep your warranty intact.",
        category: FAQ_CATEGORIES.BOILER_SERVICE.id
    },

    // ─── EV Charger ──────────────────────────────────────────────────────────
    {
        id: "faq-ev01",
        question: "What types of EV charger do you install?",
        answer: "We install 7kW single-phase home wallbox chargers, which are the most popular choice for home charging — they can fully charge most electric vehicles overnight. We offer both tethered models (cable attached) and untethered models (you plug in your own cable), from leading brands such as Ohme, Zappi, and Hypervolt.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev02",
        question: "How long does an EV charger installation take?",
        answer: "Most home EV charger installations are completed within 2–4 hours. The time can vary depending on the distance from your consumer unit to the desired charger location and whether any additional cable routing or earthing work is required.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev03",
        question: "Do I need a dedicated circuit for my EV charger?",
        answer: "Yes. EV chargers require a dedicated circuit connected directly to your consumer unit (fuse board). Our installer will assess your existing board during the visit and confirm whether an upgrade is needed before any work begins.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev04",
        question: "Can I get a government grant towards my EV charger?",
        answer: "The OZEV Electric Vehicle Homecharge Scheme (EVHS) currently provides a grant of up to £350 towards the cost of installing a home EV charger for eligible flat owners and renters. Owner-occupiers of houses are no longer eligible for this specific grant, but other incentives may apply. We will advise on current eligibility when you get a quote.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev05",
        question: "What warranty comes with the EV charger installation?",
        answer: "Our EV charger installations come with up to a 5-year warranty covering both the hardware and the installation workmanship, giving you long-term peace of mind. Individual charger manufacturers may also offer their own separate product warranties.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev06",
        question: "Can you install a smart charger?",
        answer: "Yes. We recommend and install smart chargers that connect to your home Wi-Fi and can be controlled via a smartphone app. Smart chargers let you schedule charging during cheaper off-peak tariff periods (such as Octopus Go or Agile), monitor energy usage, and set charging limits — all from your phone.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },
    {
        id: "faq-ev07",
        question: "Do you install EV chargers in rented properties or flats?",
        answer: "Yes, subject to landlord consent and building permissions. Our installers are familiar with the requirements for flats and rented properties, including communal parking situations. If you are a tenant, you will need written permission from your landlord before booking. We can provide a template letter if that helps.",
        category: FAQ_CATEGORIES.EV_CHARGER.id
    },

    // ─── Heat Pump ───────────────────────────────────────────────────────────
    {
        id: "faq-hp01",
        question: "What is an air source heat pump and how does it work?",
        answer: "An air source heat pump (ASHP) extracts heat from outside air — even at temperatures as low as -15°C — and uses it to heat your home and hot water. It works similarly to a refrigerator but in reverse, using a small amount of electricity to move heat rather than generate it, making it significantly more efficient than a traditional gas boiler.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp02",
        question: "Is my home suitable for a heat pump?",
        answer: "Heat pumps work best in well-insulated homes with larger radiators or underfloor heating, as they operate at lower flow temperatures than gas boilers. During the quoting process we will ask about your property's insulation levels, existing heating system, and outdoor space to assess suitability. In some cases, upgrading insulation or radiators first will maximise your heat pump's efficiency.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp03",
        question: "Can I get a government grant for a heat pump?",
        answer: "Yes. The UK government's Boiler Upgrade Scheme (BUS) currently offers a grant of up to £7,500 towards the cost of an air source heat pump for eligible homeowners in England and Wales. We will help you check eligibility and handle the grant application as part of our service.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp04",
        question: "How long does a heat pump installation take?",
        answer: "A typical air source heat pump installation takes 2–3 days. This includes fitting the outdoor unit, connecting it to your indoor heating system, installing or replacing the hot water cylinder, and commissioning the system. More complex installations involving significant pipework changes may take an additional day.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp05",
        question: "What warranty do I get on heat pump installation?",
        answer: "All heat pump installations by Heatingology come with a 2-year workmanship warranty. Heat pump manufacturers typically offer a separate manufacturer's warranty of 5–7 years on the unit itself. We will provide you with full warranty documentation after installation.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp06",
        question: "Will a heat pump work effectively in cold UK winters?",
        answer: "Yes. Modern air source heat pumps are designed to operate efficiently in temperatures as low as -15°C, well below typical UK winter lows. In very cold spells the system may work harder (reducing efficiency slightly), but the heat pump will continue to heat your home reliably. Many heat pumps also have a backup immersion heater for extreme weather.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },
    {
        id: "faq-hp07",
        question: "How do heat pump running costs compare to a gas boiler?",
        answer: "A heat pump typically produces 3–4 units of heat for every 1 unit of electricity it consumes (known as the coefficient of performance). Because electricity currently costs more per unit than gas, running costs depend on your energy tariff. However, with a dedicated EV/heat pump off-peak tariff and the BUS grant reducing upfront costs, many homeowners see lower overall energy bills — particularly as electricity prices are expected to fall relative to gas over the coming years.",
        category: FAQ_CATEGORIES.HEAT_PUMP.id
    },

    // ─── Payment ─────────────────────────────────────────────────────────────
    {
        id: "faq-p01",
        question: "What is Stripe?",
        answer: "Stripe is our secure online payment processor. It supports credit cards, debit cards, and digital wallets and is authorised by the UK Financial Conduct Authority as an electronic money institution (reference number 900461). Your card details are never stored on our servers.",
        category: FAQ_CATEGORIES.PAYMENT.id
    },
    {
        id: "faq-p02",
        question: "Do you offer buy now, pay later?",
        answer: "Yes. You can pay later or spread the cost using Klarna or PayPal Credit. Both options are available at checkout with no additional fees from us.",
        category: FAQ_CATEGORIES.PAYMENT.id
    },
    {
        id: "faq-p03",
        question: "What payment methods do you accept?",
        answer: "We accept all major debit and credit cards, Google Pay, Klarna, and PayPal Credit. All payments are processed securely online — we will never ask you to pay by cash or bank transfer.",
        category: FAQ_CATEGORIES.PAYMENT.id
    },
    {
        id: "faq-p04",
        question: "How do I make payment for my quote?",
        answer: "Once your quote is ready, we will send it to you by email along with a unique, one-time secure payment link. Click the link to review your quote and pay online. You can pay in full by card, Google Pay, or PayPal, or choose Klarna to spread the cost.",
        category: FAQ_CATEGORIES.PAYMENT.id
    },
    {
        id: "faq-p05",
        question: "Do you only accept online payments?",
        answer: "Yes, we process all payments securely online. We will never ask you to pay by bank transfer, cash, or any other method. If you receive a payment request that does not come via our official email or website, please contact us immediately.",
        category: FAQ_CATEGORIES.PAYMENT.id
    },
];
