"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAtividadesController = void 0;
const SearchAllAtividadesService_1 = require("../../services/atividades/SearchAllAtividadesService");
class ListAtividadesController {
    async handle(req, res) {
        const id = req.query.id;
        const allAtividades = new SearchAllAtividadesService_1.SearchAllAtividadesService();
        const atividades = await allAtividades.execute({ id });
        res.json(atividades);
    }
}
exports.ListAtividadesController = ListAtividadesController;
