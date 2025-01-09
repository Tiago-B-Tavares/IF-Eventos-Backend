import { Request, Response } from "express";
import { ShowInscriptionsOfParticipantService } from "../../services/inscricoes/ShowInscriptionsOfParticipantService";

class ShowInscritosByAtividadeController {
    async handle(req: Request, res: Response) {
        const id = req.query.user_id;

        const showInscritosService = new ShowInscriptionsOfParticipantService();
        const showInscritos = await showInscritosService.execute({ id });

        if (typeof showInscritos === 'string') {
            return res.status(400).json({ error: "Invalid data format" });
        }

        // Formatando o horário dos inscritos
        const novosInscritos = showInscritos.map((inscrito) => {
            const date = new Date(inscrito.atividade.horario);
            const horarioFormatado = date.toLocaleString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
            });

           
            return {
                ...inscrito,
                atividade: {
                    ...inscrito.atividade,
                    horario: horarioFormatado,
                    data: date.toLocaleDateString('pt-BR'),
                },
            };
        });


        return res.json(novosInscritos);
    }
}

export { ShowInscritosByAtividadeController };
