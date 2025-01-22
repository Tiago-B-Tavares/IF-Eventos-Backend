import { AppError } from "../../../ErrorControl/AppError";
import prismaClient from "../../../prisma";


interface CreateColaboradorRequest {
    organizador_id: string;
    atividade_id: string;
}

class CreateColaboradorAtividadeService {
    async execute({ organizador_id, atividade_id }: CreateColaboradorRequest) {


        try {
            // Verifica se o organizador existe
            const organizador = await prismaClient.organizador.findFirst({
                where: { id: organizador_id }
            });

            // Verifica se o organizador já está vinculado ao evento
            const organizadorEventoAlreadyExists = await prismaClient.atividadeOrganizador.findFirst({
                where: {
                    organizador_id: organizador_id,
                    atividade_id: atividade_id
                }
            });

            // Caso o organizador não exista
            if (!organizador) {
                new AppError("Oraganizador não encontrado", 404);
            }
          

            // Caso o organizador já esteja vinculado ao evento
            if (organizadorEventoAlreadyExists) {
                new AppError("Este organizador já é responsável por este evento!", 400);
            }

            // Cria a relação entre o organizador e o evento
            const colaborador = await prismaClient.atividadeOrganizador.create({
                data: {
                    atividade_id: atividade_id,
                    organizador_id: organizador_id
                }
            });
            
            return colaborador;

        } catch (error) {
            console.error(error);
            new AppError("Erro ao criar o colaborador", 400);
        }
    }
}

export { CreateColaboradorAtividadeService };
