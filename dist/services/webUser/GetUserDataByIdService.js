"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDataByIdService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class GetUserDataByIdService {
    async execute({ id }) {
        try {
            const userData = await prisma_1.default.organizador.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    email: true,
                    nome: true,
                    role: true,
                    googleId: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return { userData };
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao buscar dados do usuário", 500);
        }
    }
}
exports.GetUserDataByIdService = GetUserDataByIdService;
