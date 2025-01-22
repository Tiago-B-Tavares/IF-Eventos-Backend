
import { Request, Response } from 'express';
import { DeleteColaboradorAtividadeService } from '../../../services/responsaveis/atividades/DeleteColaboradorAtividadeService';
class DeleteColaboradorAtividadeController {
    async handle(req: Request, res: Response) {

        const atividade_id = req.query.evento as string;
        const organizador_id = req.query.organizador as string;
        try {
            const deleteColaboradorAtividade = new DeleteColaboradorAtividadeService();
            const colaborador = await deleteColaboradorAtividade.execute({ atividade_id, organizador_id });
            return res.status(200).json(colaborador);
        } catch (error) {
            console.error(error);
        }
    }
}
export { DeleteColaboradorAtividadeController }