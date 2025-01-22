import prismaClient from "../../../prisma";

class DeleteColaboradorEventoService {
  async execute({ evento_id, organizador_id }: { evento_id: string; organizador_id: string }) {
    try {
      const deleteColaboradorEvento = await prismaClient.eventoOrganizador.deleteMany({
        where: {
          AND: [
            { evento_id: evento_id },
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

export { DeleteColaboradorEventoService };
