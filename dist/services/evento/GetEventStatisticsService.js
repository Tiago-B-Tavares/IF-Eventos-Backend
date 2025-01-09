"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventStatisticsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class GetEventStatisticsService {
    async execute(eventoId) {
        console.log("service: ", eventoId);
        try {
            // Verifica se o evento existe
            const eventExists = await prisma_1.default.evento.findUnique({
                where: { id: eventoId },
                select: { id: true, nome: true },
            });
            if (!eventExists) {
                throw new Error("Evento não encontrado.");
            }
            // Conta as atividades agrupadas por tipo, filtrando pelo eventoId
            const activityTypesDistribution = await prisma_1.default.atividade.groupBy({
                by: ["tipo"],
                where: {
                    evento_id: eventoId,
                },
                _count: {
                    _all: true,
                },
            });
            // Mapeia os resultados para uma estrutura mais legível
            const activityTypeStats = activityTypesDistribution.map((type) => ({
                tipo: type.tipo,
                quantidade: type._count._all,
            }));
            return {
                evento: eventExists.nome,
                activityTypeStats,
            };
        }
        catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            throw new Error("Não foi possível obter as estatísticas.");
        }
    }
}
exports.GetEventStatisticsService = GetEventStatisticsService;
