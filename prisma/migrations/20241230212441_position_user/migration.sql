/*
  Warnings:

  - You are about to drop the column `validated` on the `check_in_out` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_in_out" DROP COLUMN "validated",
ADD COLUMN     "locationIsValid" BOOLEAN NOT NULL DEFAULT false;
