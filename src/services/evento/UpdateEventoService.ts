
import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    nome: string;
    dataInicio: Date;
    dataFim: Date;
    horario: Date;
    local: string;
    banner?: string;
    descricao: string;

}

class UpdateEventoService {
    async execute({ id, nome, descricao, dataInicio, dataFim, horario, local, banner }: UpdateEventoRequest) {
        try {

           
            const updatedEvento = await prismaClient.evento.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    descricao: descricao,
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    horario: horario,
                    local: local,
                    banner: banner
                }
            })
            return updatedEvento
        } catch (error) {
           
            throw new AppError(`Não foi possível remover este evento`, error)

        }

    }
}
export { UpdateEventoService }