"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAtividadesByEventIdController = void 0;
const ListAtividadesByEventIdService_1 = require("../../services/atividades/ListAtividadesByEventIdService");
class ListAtividadesByEventIdController {
    async handle(req, res) {
        const evento_id = req.query.eventoId;
        const allAtividades = new ListAtividadesByEventIdService_1.ListAtividadesByEventIdService();
        const atividades = await allAtividades.execute({ evento_id });
        res.json(atividades);
    }
}
exports.ListAtividadesByEventIdController = ListAtividadesByEventIdController;
