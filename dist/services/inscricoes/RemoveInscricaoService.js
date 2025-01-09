"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveInscricaoService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveInscricaoService {
    async execute({ atividade_id, participante_id }) {
        try {
            const removeInscricao = await prisma_1.default.inscricao.deleteMany({
                where: {
                    AND: [
                        { atividade_id: atividade_id },
                        { participante_id: participante_id }
                    ]
                }
            });
            const removeChekInOut = await prisma_1.default.checkIn.deleteMany({
                where: {
                    AND: [
                        { atividade_id: atividade_id },
                        { participante_id: participante_id }
                    ]
                }
            });
            if (removeInscricao.count === 0) {
                throw new AppError_1.AppError("Nehuma inscrição encontrada para remover", 404);
            }
            try {
                await prisma_1.default.atividade.update({
                    where: {
                        id: atividade_id
                    },
                    data: {
                        vagas: {
                            increment: 1
                        }
                    }
                });
                return "Inscrição removida com sucesso!";
            }
            catch (error) {
                return "Erro ao incrementar as vagas: " + error.message;
            }
        }
        catch (error) {
            return `Erro ao remover inscrição: ${error.message}`;
        }
    }
}
exports.RemoveInscricaoService = RemoveInscricaoService;
