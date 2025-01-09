"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWebUserController = void 0;
const UpdateWebUserService_1 = require("../../services/webUser/UpdateWebUserService");
class UpdateWebUserController {
    async handle(req, res) {
        const id = req.query.id;
        const { nome, email, senha } = req.body;
        const updateWebUserService = new UpdateWebUserService_1.UpdateWebUserService();
        const user = await updateWebUserService.execute({
            id,
            nome,
            email,
            senha
        });
        return res.json({
            menssage: "Usuário alterado com sucesso!"
        });
    }
}
exports.UpdateWebUserController = UpdateWebUserController;
