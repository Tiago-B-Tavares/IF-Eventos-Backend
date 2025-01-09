"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveInscricaoController = void 0;
const RemoveInscricaoService_1 = require("../../services/inscricoes/RemoveInscricaoService");
class RemoveInscricaoController {
    async handle(req, res) {
        const { atividade_id, participante_id } = req.body;
        const removeInscricaoService = new RemoveInscricaoService_1.RemoveInscricaoService();
        const remover = await removeInscricaoService.execute({ atividade_id, participante_id });
        return res.json(remover);
    }
}
exports.RemoveInscricaoController = RemoveInscricaoController;
