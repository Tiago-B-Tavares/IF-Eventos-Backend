/*
  Warnings:

  - The `tipo` column on the `atividades` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "atividades" DROP COLUMN "tipo",
ADD COLUMN     "tipo" TEXT[] DEFAULT ARRAY['Oficina', 'Palestra', 'Workshop', 'Minicurso', 'Seminário', 'Mesa Redonda', 'Roda de Conversa', 'Outro']::TEXT[];
