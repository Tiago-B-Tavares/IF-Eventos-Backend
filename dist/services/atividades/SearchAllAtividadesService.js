"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchAllAtividadesService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class SearchAllAtividadesService {
    async execute({ id }) {
        try {
            const atividades = await prisma_1.default.atividade.findMany({
                where: {
                    evento_id: id
                }, select: {
                    id: true,
                    nome: true,
                    local: true,
                    horario: true,
                    descricao: true,
                    concomitante: true,
                    vagas: true,
                    ch: true,
                },
            });
            return atividades;
        }
        catch (error) {
            throw new Error("Ocorreu um erro ao buscar as atividades \n" + error);
        }
    }
}
exports.SearchAllAtividadesService = SearchAllAtividadesService;
