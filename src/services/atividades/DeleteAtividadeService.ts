import prismaClient from "../../prisma";

interface AtividadeRequest {
    id: string;
}

class DeleteAtividadeService {
    async execute({ id }: AtividadeRequest) {
        const existsAtividade = await prismaClient.atividade.findFirst({
            where: { id }
        });

        if (!existsAtividade) {
            throw new Error("Atividade não encontrada!");
        }

        try {
            await prismaClient.atividade.delete({
                where: { id }
            });

            return "Deletado com sucesso!";
        } catch (error) {
            return `Erro: Não foi possível deletar essa atividade! ${error}`;
        }
    }
}

export { DeleteAtividadeService };
