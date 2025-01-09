"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventoController = void 0;
const ListEventoService_1 = require("../../services/evento/ListEventoService");
class ListEventoController {
    async handle(req, res) {
        const id = req.query.id;
        const eventoList = new ListEventoService_1.ListEventoService();
        const eventos = await eventoList.execute({ id });
        return res.json(eventos);
    }
}
exports.ListEventoController = ListEventoController;
