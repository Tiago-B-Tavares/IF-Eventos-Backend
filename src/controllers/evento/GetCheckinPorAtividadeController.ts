import { Request, Response } from "express";
import { GetCheckinPorAtividadeService } from "../../services/evento/GetCheckinPorAtividadeController";


class GetCheckinPorAtividadeController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
         
            const getCheckinPorAtividade = new GetCheckinPorAtividadeService();

    
            const checkinsPorAtividade = await getCheckinPorAtividade.execute();

            return res.status(200).json(checkinsPorAtividade);
        } catch (error) {
            console.error("Erro ao buscar check-ins por atividade:", error);

 
            const errorMessage = error instanceof Error ? error.message : "Erro interno no servidor";

          
            return res.status(500).json({ error: errorMessage });
        }
    }
}

export { GetCheckinPorAtividadeController };