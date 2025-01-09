"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWebUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const AppError_1 = require("../../ErrorControl/AppError");
class UpdateWebUserService {
    async execute({ id, nome, email, senha, googleId }) {
        try {
            const senhaHash = await (0, bcryptjs_1.hash)(senha, 8);
            await prisma_1.default.organizador.update({
                where: {
                    id: id,
                },
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    googleId: googleId
                }
            });
        }
        catch (error) {
            throw new AppError_1.AppError("Nao foi possivel atualizar o usuario", 500);
        }
    }
}
exports.UpdateWebUserService = UpdateWebUserService;
