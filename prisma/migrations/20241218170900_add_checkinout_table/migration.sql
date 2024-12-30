-- CreateTable
CREATE TABLE "check_in_out" (
    "id" TEXT NOT NULL,
    "participante_id" TEXT NOT NULL,
    "atividade_id" TEXT NOT NULL,
    "checkInTime" TIMESTAMP(3) NOT NULL,
    "checkOutTime" TIMESTAMP(3) NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "check_in_out_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_in_out" ADD CONSTRAINT "check_in_out_atividade_id_fkey" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in_out" ADD CONSTRAINT "check_in_out_participante_id_fkey" FOREIGN KEY ("participante_id") REFERENCES "participantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
