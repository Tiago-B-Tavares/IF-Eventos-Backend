import { Request, Response } from "express";
import { CreateColaboradorEventoService } from "../../../services/responsaveis/eventos/CreateColaboradorEventoService";



class CreateColaboradorEventoController {
    async handle(req: Request, res: Response) {
        const { organizador_id, evento_id } = req.body;

        const service = new CreateColaboradorEventoService();
        const result = await service.execute({ organizador_id, evento_id });

       

        return res.json(result);
    }
}

export { CreateColaboradorEventoController };
