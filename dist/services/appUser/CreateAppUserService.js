"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAppUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateAppUserService {
    async execute({ id, nome, email, senha, sexo, idade }) {
        try {
            if (!email) {
                throw new Error("Email incorreto!");
            }
            const userAlreadyExists = await prisma_1.default.participante.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("Email já existe!");
            }
            const senhaHash = await (0, bcryptjs_1.hash)(senha, 8);
            const user = await prisma_1.default.participante.create({
                data: {
                    id: id,
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    sexo: sexo,
                    idade: idade
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    sexo: true,
                    idade: true
                }
            });
            return user;
        }
        catch (error) {
            return { message: `Não foi possível cadastrar usuário devido ao erro: ${error} ` };
        }
    }
}
exports.CreateAppUserService = CreateAppUserService;
