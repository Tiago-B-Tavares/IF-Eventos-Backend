/*
  Warnings:

  - You are about to drop the column `tipo` on the `atividades` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoAtividade" AS ENUM ('Oficina', 'Palestra', 'Workshop', 'Minicurso', 'Seminario', 'Mesa_Redonda', 'Roda_De_Conversa', 'Outro');

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "tipo";
