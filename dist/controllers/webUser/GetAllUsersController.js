"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersController = void 0;
const GetAllUsersService_1 = require("../../services/webUser/GetAllUsersService");
class GetAllUsersController {
    async handle(req, res) {
        try {
            const getUserDataService = new GetAllUsersService_1.GetDataUserService();
            const userData = await getUserDataService.execute();
            return res.json(userData);
        }
        catch (error) {
            throw new Error("erro: " + error);
        }
    }
}
exports.GetAllUsersController = GetAllUsersController;
