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
            const [isSubscribed, atividade, checkInValidated] = await Promise.all([
                prismaClient.inscricao.findFirst({ where: { atividade_id, participante_id } }),
                prismaClient.atividade.findUnique({ where: { id: atividade_id }, select: { horario: true } }),
                prismaClient.checkIn.findFirst({
                    where: { atividade_id, participante_id },
                    select: { checkInValidated: true },
                })
            ]);

            if (!isSubscribed) {
                throw new AppError("O participante não está inscrito nesta atividade.", 400);
            }

            // Verificar se o check-in foi realizado
            if (!checkInValidated || checkInValidated.checkInValidated !== true) {
                throw new AppError("Por favor realize o check-in primeiro.", 400);
            }

            if (!atividade) {
                throw new AppError("Atividade não encontrada.", 404);
            }

            if (distance > 0.8) {
                throw new AppError("A distância do participante é maior que a permitida para realizar o check-out.", 400);
            }

            // Comparação de horário ajustada
            const agora = new Date();
            const horaAtual = agora.getUTCHours();
            const minutoAtual = agora.getUTCMinutes();
            const horarioAtividade = atividade.horario;
            const horaAtividade = horarioAtividade.getUTCHours();
            const minutoAtividade = horarioAtividade.getUTCMinutes();

            const checkOut = await prismaClient.checkOut.create({
                data: {
                    participante_id: participante_id,
                    inscricao_id: isSubscribed.id,
                    atividade_id: atividade_id,
                    checkOutTime: agora,
                    checkOutValidated: true,
                }
            });

            return checkOut;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            console.error("Erro no Check-Out:", { participante_id, atividade_id, error });
            throw new AppError("Houve um problema ao realizar o check-out. Por favor, tente novamente mais tarde.", 500);
        }
    }
}

export { CheckOutUserService };
