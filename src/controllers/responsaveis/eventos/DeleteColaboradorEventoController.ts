
import { Request, Response } from 'express';
import { DeleteColaboradorEventoService } from '../../../services/responsaveis/eventos/DeleteColaboradorEventoService';
class DeleteColaboradorEventoController {
    async handle(req: Request, res: Response) {

        const evento_id = req.query.evento as string;
        const organizador_id = req.query.organizador as string;
        try {
            const deleteColaboradorEvento = new DeleteColaboradorEventoService();
            const colaborador = await deleteColaboradorEvento.execute({ evento_id, organizador_id });
            return res.status(200).json(colaborador);
        } catch (error) {
            console.error(error);
        }
    }

}
export { DeleteColaboradorEventoController }