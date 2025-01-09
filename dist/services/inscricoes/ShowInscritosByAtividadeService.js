"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowInscritosByAtividadeService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class ShowInscritosByAtividadeService {
    async execute({ atividade_id }) {
        try {
            const inscritosList = await prisma_1.default.inscricao.findMany({
                where: {
                    atividade_id: atividade_id
                },
                include: {
                    participante: {
                        select: {
                            id: true,
                            nome: true,
                            email: true,
                            idade: true,
                            sexo: true,
                            _count: true
                        },
                    },
                },
            });
            if (!inscritosList) {
                throw new AppError_1.AppError(' Nehuma inscrição encontrada', 404);
            }
            else {
                return inscritosList;
            }
        }
        catch (error) {
            throw new AppError_1.AppError("Nehuma inscrição encontrada para remover", error);
        }
    }
}
exports.ShowInscritosByAtividadeService = ShowInscritosByAtividadeService;
