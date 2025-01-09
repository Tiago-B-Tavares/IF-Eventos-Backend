import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface CreateEventoRequest {
    nome: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    banner: string;
    descricao:string;
    organizador_id: string;
}

class CreateEventoService {
    async execute({ nome, descricao,  dataInicio, dataFim, horario, local, banner, organizador_id }: CreateEventoRequest) {

      
        
        try {
            const userRole = await prismaClient.organizador.findFirst({
                where: {
                    id: organizador_id,
                },
                select:{
                    role: true
                }
            })
            if (userRole.role === 'SUPER_ADMIN') {
                const evento = await prismaClient.evento.create({
                    data: {
                        nome,
                        descricao,
                        dataInicio,
                        dataFim,
                        horario,
                        local,
                        banner,
                    },
                });


                await prismaClient.eventoOrganizador.create({
                    data: {
                        evento_id: evento.id,
                        organizador_id: organizador_id,
                    },
                });



                return evento;
            }else{
                throw new Error("Este usuário não tem permissao para criar um evento");
            }


        } catch (error) {
            console.error(error)
             throw new AppError("Erro ao criar o evento", 500);
        }
    }
}

export { CreateEventoService };
