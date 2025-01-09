"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAppUserController = void 0;
const UpdateAppUserService_1 = require("../../services/appUser/UpdateAppUserService");
class UpdateAppUserController {
    async handle(req, res) {
        const id = req.query.id;
        const { nome, email, senha, sexo, idade } = req.body;
        const updateAppUserService = new UpdateAppUserService_1.UpdateAppUserService();
        const user = await updateAppUserService.execute({
            id,
            nome,
            email,
            senha,
            sexo,
            idade
        });
        return res.json(user);
    }
}
exports.UpdateAppUserController = UpdateAppUserController;
