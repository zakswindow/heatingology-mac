import { PrismaClient } from "@prisma/client";
import { boilers } from "./seedData/boilers";
import { blogCategories, blogs } from "./seedData/blogs";
import { qualificationCategories, qualifications } from "./seedData/qualifications";
import { heatPumps } from "./seedData/heatPumps";
import { boilerAddOns } from "./seedData/boilerAddons";
import { boilerIncluded } from "./seedData/boilerIncluded";
import { boilerService } from "./seedData/boilerService";
import { installTime } from "./seedData/install";
import { boilerRepair } from "./seedData/boilerRepair";
import { boilerExtra } from "./seedData/boilerExtra";
import { evChargerExtra } from "./seedData/evChargerExtra";
import { evChargers } from "./seedData/evCharger";
import { evCable } from "./seedData/evCable";
import { evIncluded } from "./seedData/evIncluded";

const prisma = new PrismaClient();

async function main () {
    try {
        await prisma.text.deleteMany({});
        await prisma.product.deleteMany({});

        boilers.forEach(async (item) => {
            const { description, ...others } = item;
            await prisma.product.create({
                data: {
                    ...others,
                    description: { create: description }
                }
            });
        });

        heatPumps.forEach(async (item) => {
            const { description, ...others } = item;
            await prisma.product.create({
                data: {
                    ...others,
                    description: { create: description }
                } 
            });
        });

        boilerIncluded.forEach(async (item) => {
            const { description, ...others } = item;
            await prisma.product.create({
                data: {
                    ...others,
                    description: { create: description }
                } 
            });
        });

        boilerRepair.forEach(async (item) => {
            const { description, ...others } = item;
            await prisma.product.create({
                data: {
                    ...others,
                    description: { create: description }
                } 
            });
        });

        evChargers.forEach(async (item) => {
            const { description, ...others } = item;
            await prisma.product.create({
                data: {
                    ...others,
                    description: { create: description }
                } 
            });
        });

        await prisma.product.createMany({ data: boilerService });
        await prisma.product.createMany({ data: boilerAddOns });
        await prisma.product.createMany({ data: installTime });
        await prisma.product.createMany({ data: boilerExtra });
        await prisma.product.createMany({ data: evChargerExtra });
        await prisma.product.createMany({ data: evCable });
        await prisma.product.createMany({ data: evIncluded });
    } catch (e) {
        console.error(e);
    }

    try {
        await prisma.blog.deleteMany({});
        await prisma.blogCategory.deleteMany({});
        await prisma.blogCategory.createMany({ data: blogCategories });
        await prisma.blog.createMany({ data: blogs });
    } catch (e) {
        console.error(e);
    }

    // try {
    //     await prisma.$transaction(async (tx) => {
    //         await tx.blog.deleteMany({});
    //         await tx.blogCategory.deleteMany({});

    //         // TODO: Investigate why create many does not work

    //         blogCategories.forEach(async (item) => {
    //             await prisma.blogCategory.create({ data: item });
    //         });

    //         blogs.forEach(async (item) => {
    //             await prisma.blog.create({ data: item });
    //         });
    //     });
    // } catch (e) {
    //     console.error("Failed to seed blogs.");
    //     console.error(e);
    // }

    // try {
    //     await prisma.$transaction(async (tx) => {
    //         await tx.qualification.deleteMany({});
    //         await tx.qualificationCategory.deleteMany({});

    //         await tx.qualificationCategory.createMany({ data: qualificationCategories });
    //         await tx.qualification.createMany({ data: qualifications });
    //     });
    // } catch (e) {
    //     console.error("Failed to seed blogs.");
    //     console.error(e);
    // }
}

main()
    .then(async () => {
        prisma.$disconnect();
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });