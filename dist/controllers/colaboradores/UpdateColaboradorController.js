"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColaboradorController = void 0;
const UpdateColaboradorService_1 = require("../../services/colaboradores/UpdateColaboradorService");
class UpdateColaboradorController {
    async handle(req, res) {
        try {
            const { nome } = req.body;
            const id = req.query.id;
            const colaborador = new UpdateColaboradorService_1.UpdateColaboradorService();
            const update = await colaborador.execute({
                id,
                nome
            });
            return res.json("alterado com sucesso");
        }
        catch (error) {
            console.error("Erro na solocitação", error);
        }
    }
}
exports.UpdateColaboradorController = UpdateColaboradorController;
