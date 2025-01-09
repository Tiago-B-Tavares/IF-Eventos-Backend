import { Request, Response } from "express";
import { ShowInscriptionsOfParticipantService } from "../../services/inscricoes/ShowInscriptionsOfParticipantService";

class ShowInscriptionsOfParticipantController {
    async handle(req: Request, res: Response){
        
        const atividade_id = req.query.atividade_id;

        const showInscritosService = new ShowInscriptionsOfParticipantService();
        
        const showInscritos = await showInscritosService.execute({id:atividade_id})

        return res.json(showInscritos);
    }
} 
export { ShowInscriptionsOfParticipantController }