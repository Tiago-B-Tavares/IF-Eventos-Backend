import { Request, Response } from "express";
import { GetAnalisisAtividadeService } from "../../services/evento/GetAnalisisAtividadeService";

class GetAnalisisAtividadeController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            
            const getAnalisisAtividade = new GetAnalisisAtividadeService();

           
            const analiseAtividade = await getAnalisisAtividade.execute();

            return res.status(200).json(analiseAtividade);
        } catch (error) {
            console.error("Erro ao buscar análise de atividades:", error);

            const errorMessage = error instanceof Error ? error.message : "Erro interno no servidor";

            return res.status(500).json({ error: errorMessage });
        }
    }
}

export { GetAnalisisAtividadeController };