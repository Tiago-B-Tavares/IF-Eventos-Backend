"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowInscriptionsOfParticipantService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class ShowInscriptionsOfParticipantService {
    async execute({ id }) {
        try {
            const inscritosList = await prisma_1.default.inscricao.findMany({
                where: {
                    participante_id: id
                },
                include: {
                    atividade: {
                        select: {
                            data: true,
                            nome: true,
                            descricao: true,
                            local: true,
                            horario: true,
                            vagas: true,
                            createdAt: true
                        },
                    },
                },
            });
            return inscritosList;
        }
        catch (error) {
            throw new AppError_1.AppError("Ocorreu um erro ao buscar as inscrições", 404);
        }
    }
}
exports.ShowInscriptionsOfParticipantService = ShowInscriptionsOfParticipantService;
