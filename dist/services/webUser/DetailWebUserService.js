"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailWebUSerService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class DetailWebUSerService {
    async execute(user_id) {
        try {
            const user = await prisma_1.default.organizador.findFirst({
                where: {
                    id: user_id
                },
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            });
            return user;
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao buscar o usuário", 500);
        }
    }
}
exports.DetailWebUSerService = DetailWebUSerService;
