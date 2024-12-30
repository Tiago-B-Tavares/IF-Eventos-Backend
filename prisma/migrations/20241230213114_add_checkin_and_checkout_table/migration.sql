/*
  Warnings:

  - You are about to drop the `check_in_out` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "check_in_out" DROP CONSTRAINT "check_in_out_atividade_id_fkey";

-- DropForeignKey
ALTER TABLE "check_in_out" DROP CONSTRAINT "check_in_out_inscricao_id_fkey";

-- DropForeignKey
ALTER TABLE "check_in_out" DROP CONSTRAINT "check_in_out_participante_id_fkey";

-- DropTable
DROP TABLE "check_in_out";

-- CreateTable
CREATE TABLE "check_in" (
    "id" TEXT NOT NULL,
    "participante_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "inscricao_id" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3),
    "checkInValidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_out" (
    "id" TEXT NOT NULL,
    "participante_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "inscricao_id" TEXT NOT NULL,
    "checkOutTime" TIMESTAMP(3),
    "checkOutValidated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_out_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_participante_id_fkey" FOREIGN KEY ("participante_id") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_out" ADD CONSTRAINT "check_out_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_out" ADD CONSTRAINT "check_out_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_out" ADD CONSTRAINT "check_out_participante_id_fkey" FOREIGN KEY ("participante_id") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
