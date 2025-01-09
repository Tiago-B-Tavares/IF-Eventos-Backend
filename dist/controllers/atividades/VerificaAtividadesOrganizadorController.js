"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificaAtividadesOrganizadorController = void 0;
const VerificaAtividadesOrganizadorService_1 = require("../../services/atividades/VerificaAtividadesOrganizadorService");
class VerificaAtividadesOrganizadorController {
    async handle(req, res) {
        try {
            const organizador_id = req.query.id;
            const verificaAtividadesOrganizadorService = new VerificaAtividadesOrganizadorService_1.VerificaAtividadesOrganizadorService();
            const verifica = await verificaAtividadesOrganizadorService.execute(organizador_id);
            return res.json(verifica);
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.VerificaAtividadesOrganizadorController = VerificaAtividadesOrganizadorController;
