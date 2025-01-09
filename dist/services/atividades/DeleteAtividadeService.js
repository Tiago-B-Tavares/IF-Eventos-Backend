"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAtividadeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteAtividadeService {
    async execute({ id }) {
        const existsAtividade = await prisma_1.default.atividade.findFirst({
            where: {
                id: id
            }
        });
        if (!existsAtividade) {
            throw new Error("Atividade não encontrada!!");
        }
        try {
            const atividade = await prisma_1.default.atividade.delete({
                where: {
                    id: id
                }
            });
            return "Deletado com sucesso!!";
        }
        catch (error) {
            return `Erro: Não foi possível deletar essa atividade!  ${error}`;
        }
    }
}
exports.DeleteAtividadeService = DeleteAtividadeService;
