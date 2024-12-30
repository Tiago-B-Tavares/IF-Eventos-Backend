import prismaClient from "../../prisma";

interface showInscritosRequest {

    id: string;

}
class ShowInscriptionsOfParticipantService {
    async execute({ id }) {

        try {

            const inscritosList = await prismaClient.inscricao.findMany({
                where: {
                    participante_id: id
                },
                include: {
                    

                    atividade: {
                        select: {
                            nome: true,
                            descricao:true,
                            local:true,
                            horario:true,
                            vagas:true,
                            createdAt: true
                        },
                    },
                },
            });


            return inscritosList;


        } catch (error) {
            console.log(error);
            return `erro ao listar inscritos: ${error}`


        }
    }
}
export { ShowInscriptionsOfParticipantService }