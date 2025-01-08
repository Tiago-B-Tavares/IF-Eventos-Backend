import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface CheckInUserProps {
    participante_id: string;
    atividade_id: string;
    distance: number;
}

class CheckInUserService {
    async execute({ participante_id, atividade_id, distance }: CheckInUserProps) {
        try {
            const [isSubscribed, atividade, atividadesInscritas] = await Promise.all([
                prismaClient.inscricao.findFirst({ where: { atividade_id, participante_id } }),
                prismaClient.atividade.findUnique({ where: { id: atividade_id }, select: { horario: true, concomitante: true } }),
                prismaClient.inscricao.findMany({
                    where: { participante_id: participante_id },
                    select: {
                        atividade: {
                            select: { concomitante: true, horario: true }
                        }
                    }
                })
            ]);

            if (!isSubscribed) {
                throw new AppError("O participante não está inscrito nesta atividade.", 400);
            }

            if (!atividade) {
                throw new AppError("Atividade não encontrada.", 404);
            }

            const horarioAtividade = atividade.horario;
            const horaAtividade = horarioAtividade.getUTCHours();
            const minutoAtividade = horarioAtividade.getUTCMinutes();

            // Verifica se o participante está inscrito em outra atividade no mesmo horário e que seja concomitante
            const conflito = atividadesInscritas.some(e => 
                e.atividade.concomitante && 
                e.atividade.horario.getUTCHours() === horaAtividade &&
                e.atividade.horario.getUTCMinutes() === minutoAtividade
            );

            if (conflito) {
                throw new AppError("Você já está inscrito em uma atividade no mesmo horário. Por favor, cancele uma das inscrições.", 400);
            }

            const agora = new Date();
            const horaAtual = agora.getUTCHours() - 3;
            const minutoAtual = agora.getUTCMinutes();

            if (horaAtual > horaAtividade || (horaAtual === horaAtividade && minutoAtual > minutoAtividade)) {
                throw new AppError("O horário da atividade já expirou.", 400);
            }

            if (distance > 0.5) {
                throw new AppError("A distância do participante é maior que a permitida para realizar o check-in.", 400);
            }

            const alreadyRegistered = await prismaClient.checkIn.findFirst({
                where: { atividade_id, participante_id },
            });

            if (alreadyRegistered) {
                throw new AppError("O participante já realizou o check-in nesta atividade.", 400);
            }

            const checkIn = await prismaClient.checkIn.create({
                data: {
                    participante_id: participante_id,
                    inscricao_id: isSubscribed.id,
                    atividade_id: atividade_id,
                    checkInTime: agora,
                    checkInValidated: true,
                }
            });

            return checkIn;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("Erro no Check-in:", { participante_id, atividade_id, error });
            throw new AppError("Houve um problema ao realizar o check-in. Por favor, tente novamente mais tarde.", 500);
        }
    }
}

export { CheckInUserService };
