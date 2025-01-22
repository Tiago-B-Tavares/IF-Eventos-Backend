import App from "next/app";
import prismaClient from "../../prisma";
import { AppError } from "../../ErrorControl/AppError";

interface DeleteEventoRequest {
  id: string;
}

class DeleteEventoService {
  async execute({ id }: DeleteEventoRequest) {
    try {
      const relatedActivities = await prismaClient.atividade.findMany({
        where: {
          evento_id: id,
        },
      });

      if (relatedActivities.length > 0) {
        throw new AppError("Não é permitido excluir um evento com atividades! Acesse a aba Atividades e exclua todas as atividades desse evento!", 400);
      }

      const deletedEvento = await prismaClient.evento.delete({
        where: {
          id: id,
        },
      });

      return deletedEvento
    } catch (error) {
      throw new AppError("Erro ao excluir o evento", 500);
    }
  }
}

export { DeleteEventoService };
