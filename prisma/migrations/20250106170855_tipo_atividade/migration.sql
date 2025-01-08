/*
  Warnings:

  - Added the required column `tipo` to the `atividades` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "atividades" ADD COLUMN     "tipo" "TipoAtividade" NOT NULL;
