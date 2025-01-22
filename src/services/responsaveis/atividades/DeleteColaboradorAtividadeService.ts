import prismaClient from "../../../prisma";

class DeleteColaboradorAtividadeService {
  async execute({ atividade_id, organizador_id }: { atividade_id: string; organizador_id: string }) {
    try {
      const deleteColaboradorEvento = await prismaClient.atividadeOrganizador.deleteMany({
        where: {
          AND: [
            { atividade_id: atividade_id },
            { organizador_id: organizador_id },
          ],
        },
      });

      return deleteColaboradorEvento;
    } catch (error) {
      console.error("Erro ao excluir colaborador do evento:", error);
      throw new Error("Erro ao excluir colaborador do evento");
    }
  }
}

export { DeleteColaboradorAtividadeService };
