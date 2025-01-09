"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventoService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateEventoService {
    async execute({ nome, descricao, dataInicio, dataFim, horario, local, banner, organizador_id }) {
        try {
            const userRole = await prisma_1.default.organizador.findFirst({
                where: {
                    id: organizador_id,
                },
                select: {
                    role: true
                }
            });
            if (userRole.role === 'SUPER_ADMIN') {
                const evento = await prisma_1.default.evento.create({
                    data: {
                        nome,
                        descricao,
                        dataInicio,
                        dataFim,
                        horario,
                        local,
                        banner,
                    },
                });
                await prisma_1.default.eventoOrganizador.create({
                    data: {
                        evento_id: evento.id,
                        organizador_id: organizador_id,
                    },
                });
                return evento;
            }
            else {
                throw new Error("Este usuário não tem permissao para criar um evento");
            }
        }
        catch (error) {
            console.error(error);
            throw new AppError_1.AppError("Erro ao criar o evento", 500);
        }
    }
}
exports.CreateEventoService = CreateEventoService;
