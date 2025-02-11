import prismaClient from "../../prisma";

class GetEventStatisticsService {
    async execute() {
        try {
          
            const activityTypesDistribution = await prismaClient.atividade.groupBy({
                by: ["tipo"], 
                _count: {
                    _all: true,
                },
            });

          
            const activityTypeStats = activityTypesDistribution.map((type) => ({
                tipo: type.tipo, 
                quantidade: type._count._all, 
            }));

         
            return activityTypeStats;
        } catch (error) {
            console.error("Erro ao obter estatísticas:", error);
            throw new Error("Não foi possível obter as estatísticas.");
        }
    }
}

export { GetEventStatisticsService };