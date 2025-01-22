import { get } from "http";
import { GetColaboradoresAtividadeService } from "../../../services/responsaveis/atividades/GetColaboradoresAtividadeService";
import { GetColaboradoresEventoService } from "../../../services/responsaveis/eventos/GetColaboradoresEventoService";
import { Request, Response } from "express";
class GetColaboradoresAtividadeController {
    async handle(req: Request, res: Response) {


        const atividade = req.query.evento as string


        try {


            const getColaboradoresAtividadeService = new GetColaboradoresAtividadeService()

            const colaboradores = await getColaboradoresAtividadeService.execute({ atividade })


            return res.json(colaboradores)
        } catch (error) {
            console.error("Erro na solocitação", error)
        }

    }
}
export { GetColaboradoresAtividadeController }