-- AddForeignKey
ALTER TABLE "check_in_out" ADD CONSTRAINT "check_in_out_id_fkey" FOREIGN KEY ("id") REFERENCES "inscricoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
