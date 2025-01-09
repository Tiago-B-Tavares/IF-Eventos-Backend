import prismaClient from "../../prisma";

class GetEventStatisticsService {
    async execute(eventoId: string) {
        console.log("service: ", eventoId);
        try {
            // Verifica se o evento existe
            const eventExists = await prismaClient.evento.findUnique({
                where: { id: eventoId },
                select: { id: true, nome: true },
            });

            if (!eventExists) {
                throw new Error("Evento não encontrado.");
            }

            // Conta as atividades agrupadas por tipo, filtrando pelo eventoId
            const activityTypesDistribution = await prismaClient.atividade.groupBy({
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
        } catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            throw new Error("Não foi possível obter as estatísticas.");
        }
    }
}

export { GetEventStatisticsService };
