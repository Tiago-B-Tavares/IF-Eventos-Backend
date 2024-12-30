import { Request, Response } from 'express';
import { CreateAtividadeService } from '../../services/atividades/CreateAtividadeService';

class CreateAtividadeController {
    async handle(req: Request, res: Response) {
        try {

            const {
                nome,
                descricao,
                local,
                horario,
                data,
                vagas,
                ch,
                concomitante,
                organizador_id
            } = req.body;


            const evento_id = req.query.id as string;

            const createAtividadeService = new CreateAtividadeService();
            let activityTime: Date | undefined;
            if (horario) {
                const [hours, minutes] = horario.split(':'); // Divide a hora e minutos
                const currentDate = new Date();
                currentDate.setHours(Number(hours)-3, Number(minutes), 0, 0); // Define a hora, minutos, segundos e milissegundos
                activityTime = currentDate;
            }
console.log(activityTime);



            const atividade = await createAtividadeService.execute({
                nome,
                descricao,
                local,
                horario: activityTime,
                vagas: Number(vagas),
                ch: Number(ch),
                concomitante: !!concomitante,
                data,
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
