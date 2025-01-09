"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEventoController = void 0;
const DeleteEventoService_1 = require("../../services/evento/DeleteEventoService");
class DeleteEventoController {
    async handle(req, res) {
        const id = req.query.id;
        if (!id) {
            res.json("Não tem um id");
        }
        else {
            const deleteEventoService = new DeleteEventoService_1.DeleteEventoService();
            const evento = await deleteEventoService.execute({ id });
            return res.json(evento);
        }
    }
}
exports.DeleteEventoController = DeleteEventoController;
