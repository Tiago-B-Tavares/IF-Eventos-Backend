// import prismaClient from "../../prisma";
// interface userPositionProps {
//     distance: any;
//     atividade_id: string;
//     userId: string;
// }
// class getUserPositionService {
//     async execute({ distance, atividade_id, userId }: userPositionProps) {
//         const validateUserPosition = await prismaClient.checkIn.update({
//             where: {
//                 atividade_id: atividade_id,
//                 participante_id: userId
//             data: {
//                 checkInValidated: true,
//             }
//         })
//         //         // const date =  new Date(dataAtividade.horario);
//         //         // const year = date.getFullYear();
//         //         // const month = date.getMonth() + 1;  
//         //         // const day = date.getDate();
//         // return {latitude, longitude, atividade_id};
//     }
// }
// export { getUserPositionService }
