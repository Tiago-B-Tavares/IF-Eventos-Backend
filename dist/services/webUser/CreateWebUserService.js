"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWebUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const permissionRoles_1 = require("../../enums/permissionRoles");
const AppError_1 = require("../../ErrorControl/AppError");
class CreateWebUserService {
    async execute({ nome, email, senha, googleId }) {
        try {
            if (!email) {
                throw new AppError_1.AppError("Email o campo email não pode estar vazio", 400);
            }
            // Verifica se o usuário já existe
            const userAlreadyExists = await prisma_1.default.organizador.findFirst({
                where: { email }
            });
            const IsFirstUser = await prisma_1.default.organizador.findMany();
            if (userAlreadyExists) {
                throw new AppError_1.AppError("Email ja cadastrado", 400);
            }
            // Hash da senha apenas se fornecida
            const senhaHash = senha ? await (0, bcryptjs_1.hash)(senha, 8) : undefined;
            // Criação do usuário
            const user = await prisma_1.default.organizador.create({
                data: {
                    nome,
                    email,
                    senha: senhaHash,
                    googleId,
                    role: IsFirstUser.length === 0 ? permissionRoles_1.Role.SUPER_ADMIN : permissionRoles_1.Role.ACTIVITIES_ADMIN
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    role: true
                }
            });
            return user;
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao criar o usuário", 500);
        }
    }
}
exports.CreateWebUserService = CreateWebUserService;
