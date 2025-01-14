/*
  Warnings:

  - Changed the type of `horario` on the `eventos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dataFim` on the `eventos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `dataInicio` on the `eventos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "eventos" DROP COLUMN "horario",
ADD COLUMN     "horario" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dataFim",
ADD COLUMN     "dataFim" TIMESTAMP(3) NOT NULL,
DROP COLUMN "dataInicio",
ADD COLUMN     "dataInicio" TIMESTAMP(3) NOT NULL;
