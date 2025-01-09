"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class UserAlreadyExistsService {
    async execute({ email }) {
        try {
            const user = await prisma_1.default.organizador.findFirst({
                where: {
                    email: email,
                },
                select: {
                    id: true,
                    googleId: true,
                    role: true
                },
            });
            if (user) {
                return { exists: true, id: user.id, googleId: user.googleId, role: user.role };
            }
            else {
                return { exists: false };
            }
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao buscar o usuário", 500);
        }
    }
}
exports.UserAlreadyExistsService = UserAlreadyExistsService;
