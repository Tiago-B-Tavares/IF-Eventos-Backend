"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOutUserService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class CheckOutUserService {
    async execute({ participante_id, atividade_id, distance }) {
        try {
            const [isSubscribed, atividade, checkInValidated] = await Promise.all([
                prisma_1.default.inscricao.findFirst({ where: { atividade_id, participante_id } }),
                prisma_1.default.atividade.findUnique({ where: { id: atividade_id }, select: { horario: true } }),
                prisma_1.default.checkIn.findFirst({
                    where: { atividade_id, participante_id },
                    select: { checkInValidated: true },
                })
            ]);
            if (!isSubscribed) {
                throw new AppError_1.AppError("O participante não está inscrito nesta atividade.", 400);
            }
            // Verificar se o check-in foi realizado
            if (!checkInValidated || checkInValidated.checkInValidated !== true) {
                throw new AppError_1.AppError("Por favor realize o check-in primeiro.", 400);
            }
            if (!atividade) {
                throw new AppError_1.AppError("Atividade não encontrada.", 404);
            }
            if (distance > 0.8) {
                throw new AppError_1.AppError("A distância do participante é maior que a permitida para realizar o check-out.", 400);
            }
            // Comparação de horário ajustada
            const agora = new Date();
            const horaAtual = agora.getUTCHours();
            const minutoAtual = agora.getUTCMinutes();
            const horarioAtividade = atividade.horario;
            const horaAtividade = horarioAtividade.getUTCHours();
            const minutoAtividade = horarioAtividade.getUTCMinutes();
            const checkOut = await prisma_1.default.checkOut.create({
                data: {
                    participante_id: participante_id,
                    inscricao_id: isSubscribed.id,
                    atividade_id: atividade_id,
                    checkOutTime: agora,
                    checkOutValidated: true,
                }
            });
            return checkOut;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.error("Erro no Check-Out:", { participante_id, atividade_id, error });
            throw new AppError_1.AppError("Houve um problema ao realizar o check-out. Por favor, tente novamente mais tarde.", 500);
        }
    }
}
exports.CheckOutUserService = CheckOutUserService;
