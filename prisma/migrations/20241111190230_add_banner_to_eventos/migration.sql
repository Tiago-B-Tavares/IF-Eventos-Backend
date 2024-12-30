/*
  Warnings:

  - Added the required column `banner` to the `eventos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventos" ADD COLUMN "banner" TEXT NOT NULL DEFAULT '';

