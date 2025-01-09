"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthWebUserController = void 0;
const AuthWebUserService_1 = require("../../services/webUser/AuthWebUserService");
class AuthWebUserController {
    async handle(req, res) {
        const { email, password } = req.body;
        const authWebUserService = new AuthWebUserService_1.AuthWebUserService();
        const auth = await authWebUserService.execute({
            email,
            senha: password
        });
        return res.json(auth);
    }
}
exports.AuthWebUserController = AuthWebUserController;
