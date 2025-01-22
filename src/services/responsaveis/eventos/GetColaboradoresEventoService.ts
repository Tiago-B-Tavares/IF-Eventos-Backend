
import prismaClient from "../../../prisma"

class GetColaboradoresEventoService {
    async execute({ evento }: { evento: string }) {
        try {
            const getColaboradores = await prismaClient.eventoOrganizador.findMany({
                where: {
                    evento_id: evento
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
export { GetColaboradoresEventoService }