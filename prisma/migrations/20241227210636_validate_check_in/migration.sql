/*
  Warnings:

  - You are about to drop the column `validated` on the `check_in_out` table. All the data in the column will be lost.
  - Made the column `inscricao_id` on table `check_in_out` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "check_in_out" DROP COLUMN "validated",
ADD COLUMN     "validated_checkIn" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "validated_checkOut" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "inscricao_id" SET NOT NULL;
