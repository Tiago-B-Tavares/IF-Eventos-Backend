"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWebUserController = void 0;
const CreateWebUserService_1 = require("../../services/webUser/CreateWebUserService");
class CreateWebUserController {
    async handle(req, res) {
        const { nome, email, senha, googleId } = req.body;
        try {
            const createWebUserService = new CreateWebUserService_1.CreateWebUserService();
            const user = await createWebUserService.execute({
                nome,
                email,
                senha,
                googleId,
            });
            return res.json(user);
        }
        catch (error) {
            console.error('Erro ao criar usuário:', error);
            return res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }
}
exports.CreateWebUserController = CreateWebUserController;
