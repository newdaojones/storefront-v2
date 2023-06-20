-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Individual" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "ssnOrTaxId" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "email" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "zipCode" VARCHAR(10) NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "docsAttachments" TEXT,

    CONSTRAINT "Individual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "entityName" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityTaxId" TEXT NOT NULL,
    "entityPhone" VARCHAR(15) NOT NULL,
    "entityEmail" TEXT NOT NULL,
    "entityAddress1" TEXT NOT NULL,
    "entityAddress2" TEXT,
    "entityZipCode" VARCHAR(10) NOT NULL,
    "entityCity" TEXT NOT NULL,
    "entityState" TEXT NOT NULL,
    "entityCountry" TEXT NOT NULL,
    "entityDocsAttachments" TEXT,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficial" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "beneficialName" TEXT NOT NULL,
    "beneficialType" TEXT NOT NULL,
    "beneficialTaxId" TEXT NOT NULL,
    "beneficialPhone" VARCHAR(15) NOT NULL,
    "beneficialEmail" TEXT NOT NULL,
    "beneficialAddress1" TEXT NOT NULL,
    "beneficialAddress2" TEXT,
    "beneficialZipCode" VARCHAR(10) NOT NULL,
    "beneficialCity" TEXT NOT NULL,
    "beneficialState" TEXT NOT NULL,
    "beneficialCountry" TEXT NOT NULL,
    "beneficialDocsAttachments" TEXT,

    CONSTRAINT "Beneficial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Individual_email_key" ON "Individual"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_entityEmail_key" ON "Entity"("entityEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Beneficial_beneficialEmail_key" ON "Beneficial"("beneficialEmail");

-- AddForeignKey
ALTER TABLE "Beneficial" ADD CONSTRAINT "Beneficial_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
