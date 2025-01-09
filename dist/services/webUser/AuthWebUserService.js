"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebUserService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
class AuthWebUserService {
    async execute({ email, senha }) {
        console.log(email, senha);
        try {
            const user = await prisma_1.default.organizador.findFirst({
                where: {
                    email: email,
                },
            });
            if (!user) {
                throw new AppError_1.AppError("Email ou senha incorretos!", 401);
            }
            const senhaMatch = await (0, bcryptjs_1.compare)(senha, user.senha);
            if (!senhaMatch) {
                throw new AppError_1.AppError("Email ou senha incorretos!", 401);
            }
            return {
                id: user.id,
                nome: user.nome,
                email: user.email,
            };
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao autenticar o usuário!", 500);
        }
    }
}
exports.AuthWebUserService = AuthWebUserService;
