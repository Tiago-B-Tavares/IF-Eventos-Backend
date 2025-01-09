"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserPermissionsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ChangeUserPermissionsService {
    async execute({ organizador_id, role }) {
        try {
            const changeRole = await prisma_1.default.organizador.update({
                where: {
                    id: organizador_id
                },
                data: {
                    role: role
                },
                select: {
                    nome: true,
                    role: true,
                }
            });
            return "Permissoes atualizadas!";
        }
        catch (error) {
            return "erro ao atualizar permissões";
        }
    }
}
exports.ChangeUserPermissionsService = ChangeUserPermissionsService;
