
import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface CheckInUserProps {
    participante_id: string;
    atividade_id: string;
    distance: number;
}

class CheckOutUserService {
    async execute({ participante_id, atividade_id, distance }: CheckInUserProps) {
        try {
            const [isSubscribed, atividade] = await Promise.all([
                prismaClient.inscricao.findFirst({ where: { atividade_id, participante_id } }),
                prismaClient.atividade.findUnique({ where: { id: atividade_id }, select: { horario: true } }),
            ]);

            if (!isSubscribed) {
                throw new AppError("O participante não está inscrito nesta atividade.", 400);
            }

            if (!atividade) {
                throw new AppError("Atividade não encontrada.", 404);
            }

            if (distance > 0.5) {
                throw new AppError("A distância do participante é maior que a permitida para realizar o check-in.", 400);   
            }

            const alreadyRegistered = await prismaClient.checkOut.findFirst({
                where: { atividade_id, participante_id },
            });

            if (alreadyRegistered) {
                throw new AppError("O participante já realizou o check-Out nesta atividade.", 400);
            }

           
            const horarioAtividade = atividade.horario;
            const horaAtividade = horarioAtividade.getUTCHours();
            const minutoAtividade = horarioAtividade.getUTCMinutes();

           
            const agora = new Date();
            const horaAtual = agora.getUTCHours() - 3;
            const minutoAtual = agora.getUTCMinutes();

          

         
            if (horaAtual > horaAtividade || (horaAtual === horaAtividade && minutoAtual > minutoAtividade)) {
                throw new AppError("O horário da atividade já expirou.", 400);


            }

            const checkIn = await prismaClient.checkOut.create({
                data: {
                
                    participante_id: participante_id,
                    inscricao_id: isSubscribed.id,
                    atividade_id: atividade_id,
                    checkOutTime: agora,
                    checkOutValidated: true,
             
                }
            }

            );

            return checkIn;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }


            console.error("Erro no Check-Out:", { participante_id, atividade_id, error });
            throw new AppError("Houve um problema ao realizar o check-Out. Por favor, tente novamente mais tarde.", 500);
        }
    }
}

export { CheckOutUserService };
