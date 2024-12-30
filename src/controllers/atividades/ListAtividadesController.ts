import { Request, Response } from "express";
import { SearchAllAtividadesService } from "../../services/atividades/SearchAllAtividadesService";



class ListAtividadesController {

    async handle( req: Request, res: Response) {

        const id =  req.query.id as string;

        const allAtividades = new SearchAllAtividadesService() 

        const atividades = await allAtividades.execute({id})

        res.json(atividades);
    }

}
export { ListAtividadesController }