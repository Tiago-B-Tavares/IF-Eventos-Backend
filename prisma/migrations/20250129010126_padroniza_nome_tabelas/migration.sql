/*
  Warnings:

  - You are about to drop the `atividade_organizadores` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `data` on the `atividades` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "atividade_organizadores" DROP CONSTRAINT "atividade_organizadores_atividade_id_fkey";

-- DropForeignKey
ALTER TABLE "atividade_organizadores" DROP CONSTRAINT "atividade_organizadores_organizador_id_fkey";

-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "data",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "atividade_organizadores";

-- CreateTable
CREATE TABLE "atividade_organizador" (
    "id" TEXT NOT NULL,
    "organizador_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atividade_organizador_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "atividade_organizador" ADD CONSTRAINT "atividade_organizador_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atividade_organizador" ADD CONSTRAINT "atividade_organizador_organizador_id_fkey" FOREIGN KEY ("organizador_id") REFERENCES "organizadores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
