import { $Enums } from "@prisma/client";
import prismaClient from "../../prisma";

interface UpdateAtividadeRequest {
    id: string;
    local: string;
    horario: Date;
    data: Date;
    ch: number;
    tipo:string;
    concomitante: boolean;
    nome: string;
    descricao: string;
    vagas: number;
}

class UpdateAtividadesService {
    async execute({ id, local, horario, ch, data, tipo, concomitante, nome, descricao, vagas }: UpdateAtividadeRequest) {


      
        
        try {
            const atividade = await prismaClient.atividade.update({
                where: {
                    id: id,
                },
                data: {
                    local,
                    horario,
                    data,
                    ch,
                    tipo,
                    concomitante,
                    nome,
                    descricao,
                    vagas,
                },
            });


            

            return { message: "Atividade atualizada com sucesso!", atividade };

        } catch (error: any) {
            console.error("Erro ao atualizar a atividade:", error);


            return { message: `Erro ao atualizar atividade: ${error.message}` };
        }
    }
}

export { UpdateAtividadesService };
