import { Request, Response } from "express";
import { CreateEventoService } from "../../services/evento/CreateEventoService";
import { UploadedFile } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
 
class CreateEventoController {
    async handle(req: Request, res: Response) {
        const { nome, descricao, dataInicio, dataFim, horario, local, organizador_id } = req.body;


        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "File is required" });
        }

        const file: UploadedFile = req.files['file']as UploadedFile;
        
        try {
            // Realiza o upload para o Cloudinary
            const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result as UploadApiResponse);
                    }
                }).end(file.data);
            });


            
            const createEventoService = new CreateEventoService();
            const evento = await createEventoService.execute({
                nome,
                descricao,
                dataInicio,
                dataFim,
                horario,
                banner: resultFile.secure_url,  
                local,
                organizador_id,
            });

          return res.json(evento);

        } catch (error) {
            console.error("Error uploading file:", error);
            return res.status(500).json({ error: "Error uploading file" });
        }
    }
}

export { CreateEventoController };
