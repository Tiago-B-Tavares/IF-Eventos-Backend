import { Request, Response } from "express";
import { CreateEventoService } from "../../services/evento/CreateEventoService";
import { UploadedFile } from "express-fileupload";


class CreateEventoController {
    async handle(req: Request, res: Response) {

        const { nome, descricao, dataInicio, dataFim, horario, local, organizador_id } = req.body;
     
        function formataHorario(horario: string) {
            
            const [hours, minutes] = horario.split(":").map(Number);

            const horarioFormatted = new Date();

            horarioFormatted.setHours(hours - 3);

            horarioFormatted.setMinutes(minutes);

            return horarioFormatted;
        }

        
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "File is required" });
        }

        const file: UploadedFile = req.files['file'] as UploadedFile;

        try {
            

            const createEventoService = new CreateEventoService();

            const evento = await createEventoService.execute({
                nome,
                descricao,
                dataInicio: new Date(dataInicio),
                dataFim: new Date(dataFim),
                horario: formataHorario(horario),   
                banner: file,
                local,
                organizador_id,
            });

            return res.status(201).json(evento);

        } catch (error) {
            console.error("Error uploading file:", error);
            return res.status(500).json({ error: "Error uploading file" });
        }

    }
}

export { CreateEventoController };
