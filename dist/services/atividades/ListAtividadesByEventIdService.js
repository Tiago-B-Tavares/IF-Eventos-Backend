"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAtividadesByEventIdService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class ListAtividadesByEventIdService {
    async execute({ evento_id }) {
        try {
            const atividades = await prisma_1.default.atividade.findMany({
                where: {
                    evento_id: evento_id
                }, select: {
                    id: true,
                    nome: true,
                    local: true,
                    horario: true,
                    descricao: true,
                    concomitante: true,
                    vagas: true,
                    ch: true,
                    organizadores: {
                        select: {
                            organizador: {
                                select: {
                                    nome: true,
                                }
                            }
                        }
                    },
                    inscricoes: {
                        select: {
                            id: true,
                            participante_id: true,
                            atividade_id: true
                        }
                    }
                },
            });
            return atividades;
        }
        catch (error) {
            throw new AppError_1.AppError("Ocorreu um erro ao buscar as atividades \n", error);
        }
    }
}
exports.ListAtividadesByEventIdService = ListAtividadesByEventIdService;
