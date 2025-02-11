import prismaClient from "../../prisma";

class GetRelatorioEventoService {
    async execute() {
        try {
      
            const totalAtividades = await prismaClient.atividade.count();

            const totalEventos = await prismaClient.evento.count();

         
            const totalInscricoes = await prismaClient.inscricao.count();

          
            return {
                totalAtividades,
                totalEventos,
                totalInscricoes,
            };
        } catch (error) {
            console.error("Erro ao buscar análise geral:", error);
            throw new Error("Erro ao buscar análise geral");
        }
    }
}

export { GetRelatorioEventoService };