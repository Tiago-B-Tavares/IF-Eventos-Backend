"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInUserService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class CheckInUserService {
    async execute({ participante_id, atividade_id, distance }) {
        try {
            const [isSubscribed, atividade, atividadesInscritas] = await Promise.all([
                prisma_1.default.inscricao.findFirst({ where: { atividade_id, participante_id } }),
                prisma_1.default.atividade.findUnique({ where: { id: atividade_id }, select: { horario: true, concomitante: true } }),
                prisma_1.default.inscricao.findMany({
                    where: { participante_id: participante_id },
                    select: {
                        atividade: {
                            select: { concomitante: true, horario: true }
                        }
                    }
                })
            ]);
            if (!isSubscribed) {
                throw new AppError_1.AppError("O participante não está inscrito nesta atividade.", 400);
            }
            if (!atividade) {
                throw new AppError_1.AppError("Atividade não encontrada.", 404);
            }
            const horarioAtividade = atividade.horario;
            const horaAtividade = horarioAtividade.getUTCHours();
            const minutoAtividade = horarioAtividade.getUTCMinutes();
            // Verifica se o participante está inscrito em outra atividade no mesmo horário e que seja concomitante
            const conflito = atividadesInscritas.some(e => e.atividade.concomitante &&
                e.atividade.horario.getUTCHours() === horaAtividade &&
                e.atividade.horario.getUTCMinutes() === minutoAtividade);
            if (conflito) {
                throw new AppError_1.AppError("Você já está inscrito em uma atividade no mesmo horário. Por favor, cancele uma das inscrições.", 400);
            }
            const agora = new Date();
            const horaAtual = agora.getUTCHours() - 3;
            const minutoAtual = agora.getUTCMinutes();
            if (horaAtual > horaAtividade || (horaAtual === horaAtividade && minutoAtual > minutoAtividade)) {
                throw new AppError_1.AppError("O horário da atividade já expirou.", 400);
            }
            if (distance > 0.5) {
                throw new AppError_1.AppError("A distância do participante é maior que a permitida para realizar o check-in.", 400);
            }
            const alreadyRegistered = await prisma_1.default.checkIn.findFirst({
                where: { atividade_id, participante_id },
            });
            if (alreadyRegistered) {
                throw new AppError_1.AppError("O participante já realizou o check-in nesta atividade.", 400);
            }
            const checkIn = await prisma_1.default.checkIn.create({
                data: {
                    participante_id: participante_id,
                    inscricao_id: isSubscribed.id,
                    atividade_id: atividade_id,
                    checkInTime: agora,
                    checkInValidated: true,
                }
            });
            return checkIn;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.error("Erro no Check-in:", { participante_id, atividade_id, error });
            throw new AppError_1.AppError("Houve um problema ao realizar o check-in. Por favor, tente novamente mais tarde.", 500);
        }
    }
}
exports.CheckInUserService = CheckInUserService;
