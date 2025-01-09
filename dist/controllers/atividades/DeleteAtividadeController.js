"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAtividadeController = void 0;
const DeleteAtividadeService_1 = require("../../services/atividades/DeleteAtividadeService");
class DeleteAtividadeController {
    async handle(req, res) {
        const id = req.query.id;
        const deleteAtividade = new DeleteAtividadeService_1.DeleteAtividadeService();
        const atividade = await deleteAtividade.execute({ id });
        res.json({ message: atividade });
    }
}
exports.DeleteAtividadeController = DeleteAtividadeController;
