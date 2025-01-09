"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColaboradorAtividadeController = void 0;
const CreateColaboradorAtividadeService_1 = require("../../services/colaboradores/CreateColaboradorAtividadeService");
class CreateColaboradorAtividadeController {
    async handle(req, res) {
        const { organizador_id, atividade_id } = req.body;
        const service = new CreateColaboradorAtividadeService_1.CreateColaboradorAtividadeService();
        const result = await service.execute({ organizador_id, atividade_id });
        if (result.error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json({ message: result.message });
    }
}
exports.CreateColaboradorAtividadeController = CreateColaboradorAtividadeController;
