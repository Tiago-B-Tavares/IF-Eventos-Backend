/*
  Warnings:

  - Changed the type of `horario` on the `atividades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "horario",
ADD COLUMN     "horario" TIMESTAMP(3) NOT NULL;
