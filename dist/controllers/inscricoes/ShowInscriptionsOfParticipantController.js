"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowInscriptionsOfParticipantController = void 0;
const ShowInscriptionsOfParticipantService_1 = require("../../services/inscricoes/ShowInscriptionsOfParticipantService");
class ShowInscriptionsOfParticipantController {
    async handle(req, res) {
        const atividade_id = req.query.atividade_id;
        const showInscritosService = new ShowInscriptionsOfParticipantService_1.ShowInscriptionsOfParticipantService();
        const showInscritos = await showInscritosService.execute({ id: atividade_id });
        return res.json(showInscritos);
    }
}
exports.ShowInscriptionsOfParticipantController = ShowInscriptionsOfParticipantController;
