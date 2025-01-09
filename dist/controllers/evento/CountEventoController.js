"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountEventosController = void 0;
const CountEventosService_1 = require("../../services/evento/CountEventosService");
class CountEventosController {
    async handle(req, res) {
        const id = req.query.id;
        const eventoList = new CountEventosService_1.CountEventosService();
        const eventos = await eventoList.execute({ id });
        return res.json(eventos);
    }
}
exports.CountEventosController = CountEventosController;
