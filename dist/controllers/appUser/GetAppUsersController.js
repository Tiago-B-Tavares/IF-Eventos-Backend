"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppUsersController = void 0;
const GetAppUsersService_1 = require("../../services/appUser/GetAppUsersService");
class GetAppUsersController {
    async handle(req, res) {
        const getUsers = new GetAppUsersService_1.GetAppUsersService();
        try {
            const listUsers = await getUsers.execute();
            return res.json(listUsers);
        }
        catch (error) {
            return res.status(500).json({ error: "Erro ao listar usuários." });
        }
    }
}
exports.GetAppUsersController = GetAppUsersController;
