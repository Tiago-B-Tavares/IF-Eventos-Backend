import { GetColaboradoresEventoService } from "../../../services/responsaveis/eventos/GetColaboradoresEventoService";
import { Request, Response } from "express";
class GetColaboradoresEventoController {
    async handle(req: Request, res: Response) {


        const evento = req.query.evento as string


        try {


            const getColaboradoresEventoService = new GetColaboradoresEventoService()

            const colaboradores = await getColaboradoresEventoService.execute({ evento })


            return res.json(colaboradores)
        } catch (error) {
            console.error("Erro na solocitação", error)
        }

    }
}
export { GetColaboradoresEventoController }