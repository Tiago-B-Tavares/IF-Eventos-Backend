"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColaboradorAtividadeService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateColaboradorAtividadeService {
    async execute({ organizador_id, atividade_id }) {
        try {
            const organizador = await prisma_1.default.organizador.findFirst({
                where: { id: organizador_id }
            });
            const organizadorAtividadeAlreadyExists = await prisma_1.default.atividadeOrganizador.findFirst({
                where: {
                    organizador_id: organizador_id,
                    atividade_id: atividade_id
                }
            });
            if (!organizador) {
                return { message: "Não existe um usuário cadastrado." };
            }
            if (organizadorAtividadeAlreadyExists) {
                return { message: "Este usuário já é responsável por esta atividade!" };
            }
            await prisma_1.default.atividadeOrganizador.create({
                data: {
                    atividade_id: atividade_id,
                    organizador_id: organizador_id
                }
            });
        }
        catch (error) {
            return { error: true, message: `Não foi possível adicionar colaborador devido ao erro: ${error.message}` };
        }
    }
}
exports.CreateColaboradorAtividadeService = CreateColaboradorAtividadeService;
