import { Request, Response } from "express";
import { CreateInscricaoService } from "../../services/inscricoes/CreateInscricaoService";

class CreateInscricoesController {
    async handle(req: Request, res: Response) {
        const { atividade_id, participante_id } = req.body;

        const createInscricaoService = new CreateInscricaoService();

        try {
            const inscrever = await createInscricaoService.execute({
                atividade_id,
                participante_id,
            });

            return res.status(201).json(inscrever);
        } catch (error) {
            console.error("Erro ao criar inscrição:", error.message);

            return res.status(400).json({
                error: "Erro ao criar inscrição.",
                message: error.message,
            });
        }
    }
}

export { CreateInscricoesController };
