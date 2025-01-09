"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtividadesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateAtividadesService {
    async execute({ id, local, horario, ch, tipo, concomitante, nome, descricao, vagas }) {
        try {
            const atividade = await prisma_1.default.atividade.update({
                where: {
                    id: id,
                },
                data: {
                    local,
                    horario,
                    ch,
                    tipo,
                    concomitante,
                    nome,
                    descricao,
                    vagas,
                },
            });
            return { message: "Atividade atualizada com sucesso!", atividade };
        }
        catch (error) {
            console.error("Erro ao atualizar a atividade:", error);
            return { message: `Erro ao atualizar atividade: ${error.message}` };
        }
    }
}
exports.UpdateAtividadesService = UpdateAtividadesService;
