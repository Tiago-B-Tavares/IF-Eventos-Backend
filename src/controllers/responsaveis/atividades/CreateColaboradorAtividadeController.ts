import { Request, Response } from "express";
import { CreateColaboradorAtividadeService } from "../../../services/responsaveis/atividades/CreateColaboradorAtividadeService";



class CreateColaboradorAtividadeController {
    async handle(req: Request, res: Response) {
        const { organizador_id, atividade_id } = req.body;


        const service = new CreateColaboradorAtividadeService();
        const result = await service.execute({ organizador_id, atividade_id });

       


        return res.json(result);
    }
}

export { CreateColaboradorAtividadeController };
