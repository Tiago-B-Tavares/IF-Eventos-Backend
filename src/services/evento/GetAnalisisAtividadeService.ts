import prismaClient from "../../prisma";

class GetAnalisisAtividadeService {
    async execute() {
       
        const getAtividadeData = await prismaClient.atividade.findMany({
            select: {
                id: true,
                nome: true,
            },
        });

      
        const atividadeIds = getAtividadeData.map(atividade => atividade.id);

       
        const inscricoesPorAtividade = await prismaClient.inscricao.groupBy({
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

        
        const inscricoesMap = new Map();
        inscricoesPorAtividade.forEach(item => {
            inscricoesMap.set(item.atividade_id, item._count.atividade_id);
        });

       
        const resultado = getAtividadeData.map(atividade => ({
        
            nome: atividade.nome,
            inscritos: inscricoesMap.get(atividade.id) || 0,
        }));

        return resultado;
    
    }
}

export { GetAnalisisAtividadeService };