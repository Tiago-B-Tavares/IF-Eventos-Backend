import e from "express";
import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface showInscritosRequest {

    atividade_id: string;

}
class ShowInscritosByAtividadeService {
    async execute({ atividade_id }) {
        
        try {

            const inscritosList = await prismaClient.inscricao.findMany({
                where: {
                    atividade_id:atividade_id
                },
                include: {
                    
                    participante: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            idade: true,
                            sexo: true,
                            _count:true

                        },
                    },
                },
            });
            if (!inscritosList) {
                throw new AppError(' Nehuma inscrição encontrada',404);
            } else {
                return inscritosList;
                    
            }


        } catch (error) {
          
            throw new AppError("Nehuma inscrição encontrada para remover", error);
           
            
        }
    }
}
export { ShowInscritosByAtividadeService }