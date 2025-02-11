import prismaClient from "../../prisma";

class GetCheckinPorAtividadeService {
    async execute() {
        try {
            const atividades = await prismaClient.atividade.findMany({
                select: {
                    id: true,
                    nome: true,
                },
            });

            const atividadeIds = atividades.map(atividade => atividade.id);

            const checkinsPorAtividade = await prismaClient.checkIn.groupBy({
                by: ['atividade_id'],
                _count: {
                    atividade_id: true,
                },
                where: {
                    atividade_id: {
                        in: atividadeIds,
                    },
                },
            });

          
            const checkinsMap = new Map();
            checkinsPorAtividade.forEach(item => {
                checkinsMap.set(item.atividade_id, item._count.atividade_id);
            });

            const resultado = atividades.map(atividade => ({
                nome: atividade.nome,
                checkIns: checkinsMap.get(atividade.id) || 0, 
            }));

            return resultado;
        } catch (error) {
            console.error("Erro ao buscar check-ins por atividade:", error);
            throw new Error("Erro ao buscar check-ins por atividade");
        }
    }
}

export { GetCheckinPorAtividadeService };