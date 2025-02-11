import { Request, Response } from "express";
import { GetRelatorioEventoService } from "../../services/evento/GetRelatorioEventoService";

class GetRelatorioEventoController {
    async handle(req: Request, res: Response): Promise<Response> {
        try {
            
            const getAnalisisEvento = new GetRelatorioEventoService();

           
            const analiseAtividade = await getAnalisisEvento.execute();

            return res.status(200).json(analiseAtividade);
        } catch (error) {
            console.error("Erro ao buscar análise de evento:", error);

            const errorMessage = error instanceof Error ? error.message : "Erro interno no servidor";

            return res.status(500).json({ error: errorMessage });
        }
    }
}

export { GetRelatorioEventoController };