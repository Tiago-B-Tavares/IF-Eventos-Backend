import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { stat } from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
interface CreateEventoRequest {
    nome: string;
    dataInicio: Date;
    dataFim: Date;
    horario: Date;
    local: string;
    banner: UploadedFile;
    descricao: string;
    organizador_id: string;
}

class CreateEventoService {

    async execute({ nome, descricao, dataInicio, dataFim, horario, local, banner, organizador_id }: CreateEventoRequest) {
        const dataInicioFormatted = new Date(dataInicio + 'T00:00:00.000Z');
        const dataFimFormatted = new Date(dataFim + 'T00:00:00.000Z');
        
        try {

           
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as UploadApiResponse);
                    }
                }).end(banner.data);
            });

            const userRole = await prismaClient.organizador.findFirst({
                where: {
                    id: organizador_id,
                },
                select: {
                    role: true
                }
            })
            if (userRole.role === 'SUPER_ADMIN') {
                const evento = await prismaClient.evento.create({
                    data: {
                        nome,
                        descricao,
                        dataInicio: dataInicioFormatted,
                        dataFim: dataFimFormatted,
                        horario,
                        local,
                        banner: resultFile.secure_url,
                    },
                });


                await prismaClient.eventoOrganizador.create({
                    data: {
                        evento_id: evento.id,
                        organizador_id: organizador_id,
                    },
                });

                return evento;

            } else {
                throw new AppError("Este usuário não tem permissao para criar um evento", 400);
            }

        } catch (error) {
            console.error(error)
            throw new AppError("Erro ao criar o evento", 500);
        }
    }
}

export { CreateEventoService };
