"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrganizadorEventoService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddOrganizadorEventoService {
    async execute({ organizador_id, evento_id }) {
        try {
            const orgEvento = await prisma_1.default.eventoOrganizador.create({
                data: {
                    evento_id: evento_id,
                    organizador_id: organizador_id,
                }
            });
            return orgEvento;
        }
        catch (error) {
            throw new Error("erro ao adicionar irganizador do evento: " + error);
        }
    }
}
exports.AddOrganizadorEventoService = AddOrganizadorEventoService;
