"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsController = void 0;
const UserAlreadyExistsService_1 = require("../../services/webUser/UserAlreadyExistsService");
class UserAlreadyExistsController {
    async handler(req, res) {
        const email = req.query.email;
        const userAlreadyExistsService = new UserAlreadyExistsService_1.UserAlreadyExistsService();
        const result = await userAlreadyExistsService.execute({ email });
        return res.json(result);
    }
}
exports.UserAlreadyExistsController = UserAlreadyExistsController;
