"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountEventosService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CountEventosService {
    async execute({ id }) {
        try {
            const listEventos = await prisma_1.default.evento.count({
                where: {
                    organizadores: {
                        some: {
                            organizador: {
                                id: id
                            }
                        }
                    }
                },
            });
            return listEventos;
        }
        catch (error) {
            return { message: `Não foi possível contar os Eventos devido ao erro: ${error}` };
        }
    }
}
exports.CountEventosService = CountEventosService;
