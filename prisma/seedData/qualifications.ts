import { QUALIFICATION_CATEGORY } from "@prisma/client";

export const qualificationCategories = [{
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    label: "Gas Safe"
}, {
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES,
    label: "Install Abilities"
}, {
    categoryId: QUALIFICATION_CATEGORY.TECHNICAL_ABILITIES,
    label: "Technical Abilities"
}, {
    categoryId: QUALIFICATION_CATEGORY.OTHER,
    label: "Other"
}];

export const qualifications = [{
    name: "Gas boiler",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "Natural Gas"
}, {
    name: "Building regs",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "Natural Gas"
}, {
    name: "Pipework",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "Natural Gas"
}, {
    name: "Gas boiler",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "LPG"
}, {
    name: "Building regs",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "LPG"
}, {
    name: "Pipework",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "LPG"
}, {
    name: "Water heater",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "LPG"
}, {
    name: "Caravans",
    categoryId: QUALIFICATION_CATEGORY.GAS_SAFE,
    subCategory: "LPG"
}, {
    name: "Electric Part P",
    categoryId: QUALIFICATION_CATEGORY.OTHER
}, {
    name: "Working at height",
    categoryId: QUALIFICATION_CATEGORY.OTHER
}, {
    name: "CENWAT",
    categoryId: QUALIFICATION_CATEGORY.OTHER
}, {
    name: "Unvented hot water storage",
    categoryId: QUALIFICATION_CATEGORY.OTHER
}, {
    name: "FGas",
    categoryId: QUALIFICATION_CATEGORY.OTHER
}, {
    name: "Combi swaps",
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES
}, {
    name: "Regular swaps",
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES
}, {
    name: "System swaps",
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES
}, {
    name: "Conversions",
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES
}, {
    name: "BBU conversions",
    categoryId: QUALIFICATION_CATEGORY.INSTALL_ABILITIES
}, {
    name: "S/Y plan wiring",
    categoryId: QUALIFICATION_CATEGORY.TECHNICAL_ABILITIES
}, {
    name: "Vertical flue installations",
    categoryId: QUALIFICATION_CATEGORY.TECHNICAL_ABILITIES
}, {
    name: `MagnaCleanse flushing (I've been trained, and have the equipment)`,
    categoryId: QUALIFICATION_CATEGORY.TECHNICAL_ABILITIES
}];