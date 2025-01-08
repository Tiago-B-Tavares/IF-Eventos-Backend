
import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface UpdateEventoRequest {
    id: string;
    nome:string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;

}
class UpdateEventoService {
    async execute({ id, nome, descricao, dataInicio, dataFim, horario, local }: UpdateEventoRequest) {
        try {
       
            
            const updadeEvento = await prismaClient.evento.update({
                where: {
                    id: id
                },
                data: {
                    nome:nome,
                    descricao:descricao,
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    horario: horario,
                    local: local,
                }
            })
            return { message: "alterado com susesso!" }
        } catch (error) {
            throw new  AppError(`Não foi possível remover este evento`, error )
        
        }
        
    }
}
export { UpdateEventoService }