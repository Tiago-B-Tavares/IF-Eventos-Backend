"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventoController = void 0;
const UpdateEventoService_1 = require("../../services/evento/UpdateEventoService");
class UpdateEventoController {
    async handle(req, res) {
        const { nome, descricao, dataInicio, dataFim, horario, local } = req.body;
        const id = req.query.id;
        if (!id) {
            res.json("Não tem um id");
        }
        else {
            const updateEventoService = new UpdateEventoService_1.UpdateEventoService();
            const evento = await updateEventoService.execute({
                id,
                nome,
                descricao,
                dataInicio,
                dataFim,
                horario,
                local
            });
            return res.json(evento);
        }
    }
}
exports.UpdateEventoController = UpdateEventoController;
