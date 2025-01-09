"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventoService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class ListEventoService {
    async execute({ id }) {
        try {
            const listEventos = await prisma_1.default.evento.findMany({
                where: {
                    organizadores: {
                        some: {
                            organizador: {
                                id: id
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    horario: true,
                    dataInicio: true,
                    dataFim: true,
                    local: true,
                    banner: true,
                    _count: true,
                    organizadores: {
                        select: {
                            organizador: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    atividades: {
                        select: {
                            id: true,
                            nome: true,
                            local: true,
                            horario: true,
                            concomitante: true,
                            descricao: true,
                            vagas: true,
                            ch: true,
                            tipo: true,
                            inscricoes: {
                                select: {
                                    participante: {
                                        select: {
                                            nome: true
                                        }
                                    }
                                }
                            },
                            organizadores: {
                                select: {
                                    organizador: {
                                        select: {
                                            nome: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            if (!listEventos) {
                throw new Error("Nenhum evento encontrado");
            }
            return listEventos;
        }
        catch (error) {
            throw new AppError_1.AppError(`Não foi possível listar os Eventos devido ao erro:`, error);
        }
    }
}
exports.ListEventoService = ListEventoService;
