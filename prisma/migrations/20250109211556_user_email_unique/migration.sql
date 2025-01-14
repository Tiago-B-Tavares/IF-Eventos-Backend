/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `organizadores` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "TipoAtividade" ADD VALUE 'Apresentacao';

-- CreateIndex
CREATE UNIQUE INDEX "organizadores_email_key" ON "organizadores"("email");
