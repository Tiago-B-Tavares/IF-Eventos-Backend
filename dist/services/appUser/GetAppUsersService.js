"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppUsersService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetAppUsersService {
    async execute() {
        try {
            const getUsers = await prisma_1.default.participante.findMany();
            return getUsers;
        }
        catch (error) {
            throw new Error(`Erro ao buscar participantes: ${error.message}`);
        }
    }
}
exports.GetAppUsersService = GetAppUsersService;
