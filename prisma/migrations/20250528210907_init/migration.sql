-- CreateTable
CREATE TABLE "Heater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Heater_id_key" ON "Heater"("id");
