"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllEventosController = void 0;
const ListAllEventosService_1 = require("../../services/evento/ListAllEventosService");
class ListAllEventosController {
    async handle(req, res) {
        const eventoList = new ListAllEventosService_1.ListAllEventosService();
        const eventos = await eventoList.execute();
        return res.json(eventos);
    }
}
exports.ListAllEventosController = ListAllEventosController;
