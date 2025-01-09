"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColaboradorEventoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateColaboradorEventoService {
    async execute({ organizador_id, evento_id }) {
        try {
            // Verifica se o organizador existe
            const organizador = await prisma_1.default.organizador.findFirst({
                where: { id: organizador_id }
            });
            // Verifica se o organizador já está vinculado ao evento
            const organizadorEventoAlreadyExists = await prisma_1.default.eventoOrganizador.findFirst({
                where: {
                    organizador_id: organizador_id,
                    evento_id: evento_id
                }
            });
            // Caso o organizador não exista
            if (!organizador) {
                return { message: "Não existe um organizador cadastrado com esse ID." };
            }
            // Caso o organizador já esteja vinculado ao evento
            if (organizadorEventoAlreadyExists) {
                return { message: "Este organizador já é responsável por este evento!" };
            }
            // Cria a relação entre o organizador e o evento
            const colaborador = await prisma_1.default.eventoOrganizador.create({
                data: {
                    evento_id: evento_id,
                    organizador_id: organizador_id
                }
            });
            // Retorna o resultado
            return { message: "Colaborador adicionado com sucesso!", colaborador };
        }
        catch (error) {
            // Retorna erro
            return { error: true, message: `Não foi possível adicionar colaborador devido ao erro: ${error.message}` };
        }
    }
}
exports.CreateColaboradorEventoService = CreateColaboradorEventoService;
