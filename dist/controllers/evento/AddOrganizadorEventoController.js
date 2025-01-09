"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddOrganizadorEventoController = void 0;
const AddOrganizadorEventoService_1 = require("../../services/evento/AddOrganizadorEventoService");
class AddOrganizadorEventoController {
    async handle(req, res) {
        const { evento_id, organizador_id } = req.body;
        const addOrganizadorEventoService = new AddOrganizadorEventoService_1.AddOrganizadorEventoService();
        const newOrgEvento = addOrganizadorEventoService.execute({
            evento_id,
            organizador_id
        });
        res.json(newOrgEvento);
    }
}
exports.AddOrganizadorEventoController = AddOrganizadorEventoController;
