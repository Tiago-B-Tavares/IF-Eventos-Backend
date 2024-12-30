import { Request, Response } from "express";
import { ListAtividadesByEventIdService } from "../../services/atividades/ListAtividadesByEventIdService";



class ListAtividadesByEventIdController {

    async handle( req: Request, res: Response) {


        const evento_id =  req.query.eventoId as string;

        const allAtividades = new ListAtividadesByEventIdService() 

        const atividades = await allAtividades.execute({evento_id})

        res.json(atividades);
    }

}
export { ListAtividadesByEventIdController }