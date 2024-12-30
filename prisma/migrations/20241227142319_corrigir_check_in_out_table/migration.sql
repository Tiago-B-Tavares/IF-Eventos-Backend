-- DropForeignKey
ALTER TABLE "check_in_out" DROP CONSTRAINT "check_in_out_id_fkey";

-- AlterTable
ALTER TABLE "check_in_out" ADD COLUMN     "inscricao_id" TEXT;

-- AddForeignKey
ALTER TABLE "check_in_out" ADD CONSTRAINT "check_in_out_inscricao_id_fkey" FOREIGN KEY ("inscricao_id") REFERENCES "inscricoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
