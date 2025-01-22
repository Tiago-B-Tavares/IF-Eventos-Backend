
import prismaClient from "../../../prisma"

class GetColaboradoresAtividadeService {
    async execute({ atividade }: { atividade: string }) {
        try {
            const getColaboradores = await prismaClient.atividadeOrganizador.findMany({
                where: {
                    atividade_id: atividade
                },

                include: {
                    organizador: {
                        select: {

                            nome: true,
                            id:true

                        }
                    }
                }

            })

            const colaboradoresList = getColaboradores.map(colaborador => {
                return  ({
                    nome: colaborador.organizador.nome,
                    id: colaborador.organizador.id
                })
            })
            return  colaboradoresList

        } catch (error) {
            console.error(error);
            return { message: "Erro ao Atualizar", error };

        }
    }
}
export { GetColaboradoresAtividadeService }