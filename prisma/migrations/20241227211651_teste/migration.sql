/*
  Warnings:

  - You are about to drop the column `validated_checkIn` on the `check_in_out` table. All the data in the column will be lost.
  - You are about to drop the column `validated_checkOut` on the `check_in_out` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_in_out" DROP COLUMN "validated_checkIn",
DROP COLUMN "validated_checkOut",
ADD COLUMN     "validated" BOOLEAN NOT NULL DEFAULT false;
