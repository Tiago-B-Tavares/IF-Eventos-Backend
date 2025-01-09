"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDataUserService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class GetDataUserService {
    async execute() {
        try {
            const userData = await prisma_1.default.organizador.findMany();
            return userData;
        }
        catch (error) {
            throw new AppError_1.AppError("Erro ao buscar dados do usuário", 500);
        }
    }
}
exports.GetDataUserService = GetDataUserService;
