import prismaClient from "../../prisma";

class GetEventStatisticsService {
    async execute(eventoId: string) {
        console.log("service: ", eventoId);
        try {
            // Busca os dados do evento e a contagem de atividades associadas
            const eventStatistics = await prismaClient.evento.findFirst({
                where: {
                    id: eventoId, // Filtro para o evento específico
                },
                select: {
                    nome: true, // Nome do evento
                    atividades: {
                        select: {
                            id: true,
                            nome: true, // Nome da atividade
                            inscricoes: true, // Contagem de inscrições associadas a cada atividade
                        },
                    },
                },
            });

            if (!eventStatistics) {
                throw new Error("Evento não encontrado.");
            }

            // Analisa a distribuição de tipos de atividades
            const activityTypesDistribution = await prismaClient.atividade.groupBy({
                by: ["tipo"],
                _count: {
                    _all: true,
                },
            });

            if (activityTypesDistribution.length === 0) {
                throw new Error("Nenhuma distribuição de tipo de atividade encontrada.");
            }

            const activityTypeStats = activityTypesDistribution.map((type) => ({
                tipo: type.tipo,
                quantidade: type._count._all,
            }));

            return {
                activityTypeStats
            };
        } catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            throw new Error("Não foi possível obter as estatísticas.");
        }
    }
}

export { GetEventStatisticsService };
