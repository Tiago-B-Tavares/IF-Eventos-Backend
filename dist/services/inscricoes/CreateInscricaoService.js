"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInscricaoService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateInscricaoService {
    async execute({ atividade_id, participante_id }) {
        try {
            const existeInscricao = await prisma_1.default.inscricao.findFirst({
                where: { atividade_id, participante_id },
            });
            if (existeInscricao) {
                throw new AppError_1.AppError("Você já está inscrito nesta atividade.", 400);
            }
            const participante = await prisma_1.default.participante.findUnique({
                where: { id: participante_id },
            });
            if (!participante) {
                throw new AppError_1.AppError("Participante não encontrado.", 404);
            }
            const atividade = await prisma_1.default.atividade.findUnique({
                where: { id: atividade_id },
            });
            if (!atividade) {
                throw new AppError_1.AppError("Atividade não encontrada.", 404);
            }
            if (atividade.vagas <= 0) {
                throw new AppError_1.AppError("Atividade sem vagas disponíveis.", 400);
            }
            const inscricao = await prisma_1.default.inscricao.create({
                data: {
                    atividade_id: atividade_id,
                    participante_id: participante_id,
                },
            });
            await prisma_1.default.atividade.update({
                where: { id: atividade_id },
                data: { vagas: { decrement: 1 } },
            });
            return inscricao;
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                throw error;
            }
            console.error("Erro interno ao criar inscrição:", error);
            throw new AppError_1.AppError("Erro interno no servidor.", 500);
        }
    }
}
exports.CreateInscricaoService = CreateInscricaoService;
