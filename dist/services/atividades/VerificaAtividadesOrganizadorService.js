"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificaAtividadesOrganizadorService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class VerificaAtividadesOrganizadorService {
    async execute(organizador_id) {
        try {
            const verifica = await prisma_1.default.atividadeOrganizador.findMany({
                where: {
                    organizador_id: organizador_id
                }
            });
            return verifica;
        }
        catch (erro) {
            console.log(erro);
        }
    }
}
exports.VerificaAtividadesOrganizadorService = VerificaAtividadesOrganizadorService;
