import { Request, Response } from 'express';
import { CreateAtividadeService } from '../../services/atividades/CreateAtividadeService';
import { $Enums } from '@prisma/client';

class CreateAtividadeController {
    async handle(req: Request, res: Response) {
        try {

            let {
                nome,
                descricao,
                local,
                horario,
                data,
                vagas,
                ch,
                tipo,
                concomitante,
                organizador_id
            } = req.body;



            const evento_id = req.query.id as string;


            const tiposPermitidos = [
                "Oficina",
                "Palestra",
                "Workshop",
                "Minicurso",
                "Seminario",
                "Mesa Redonda",
                "Roda de Conversa",
                "Hackathon",
            ];
            if (!tiposPermitidos.includes(tipo)) {
                throw new Error("Tipo de atividade inválido");
            }
            const createAtividadeService = new CreateAtividadeService();
            let activityTime: Date | undefined;
            if (horario) {
                const [hours, minutes] = horario.split(':');
                const currentDate = new Date();
                currentDate.setHours(Number(hours) - 3, Number(minutes), 0, 0);
                activityTime = currentDate;
            }





            const atividade = await createAtividadeService.execute({
                nome,
                descricao,
                local,
                horario: activityTime,
                vagas: Number(vagas),
                ch: Number(ch),
                tipo: tipo,
                concomitante: !!concomitante,
                data:new Date(data),
                evento_id,
                organizador_id,

            });


            return res.json(atividade);
        } catch (error) {

            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateAtividadeController };
