"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppUserService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class UpdateAppUserService {
    async execute({ id, nome, email, senha, sexo, idade }) {
        const senhaHash = await (0, bcryptjs_1.hash)(senha, 8);
        try {
            const alterUser = prisma_1.default.participante.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    sexo: sexo,
                    idade: idade
                }
            });
            return alterUser;
        }
        catch (error) {
            return { message: `Não foi possível alterar os dados usuário devido ao erro: \n ${error} ` };
        }
    }
}
exports.UpdateAppUserService = UpdateAppUserService;
