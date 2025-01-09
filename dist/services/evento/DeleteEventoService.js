"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DeleteEventoService {
    async execute({ id }) {
        try {
            const relatedActivities = await prisma_1.default.atividade.findMany({
                where: {
                    evento_id: id,
                },
            });
            if (relatedActivities.length > 0) {
                throw new Error("Não é permitido excluir um evento com atividades! Acesse a aba Atividades e exclua todas as atividades desse evento!");
            }
            const deletedEvento = await prisma_1.default.evento.delete({
                where: {
                    id: id,
                },
            });
            return { message: "Deletado com sucesso" };
        }
        catch (error) {
            return { error: error.message };
        }
    }
}
exports.DeleteEventoService = DeleteEventoService;
