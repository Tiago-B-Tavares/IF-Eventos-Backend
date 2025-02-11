import { Request, Response } from "express";
import { UpdateEventoService } from "../../services/evento/UpdateEventoService";

class UpdateEventoController {
    async handle(req: Request, res: Response) {

        const { nome, descricao, dataInicio, dataFim, horario, local, banner } = req.body;


        const id = req.query.id as string;

        if (!nome || !descricao || !dataInicio || !dataFim || !horario || !local) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }
        const horarioFormatado = new Date();
        horarioFormatado.setHours(Number(horario.slice(0, 2)-3));
        horarioFormatado.setMinutes(Number(horario.slice(-2)));
        try {
            const updateEventoService = new UpdateEventoService();

            const evento = await updateEventoService.execute({
                id,
                nome,
                descricao,
                dataInicio: new Date(dataInicio),
                dataFim: new Date(dataFim),
                horario: horarioFormatado,
                local,
                banner
            })
      

            return res.json(evento);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
export { UpdateEventoController }