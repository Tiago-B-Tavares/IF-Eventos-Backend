"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDataByIdController = void 0;
const GetUserDataByIdService_1 = require("../../services/webUser/GetUserDataByIdService");
class GetUserDataByIdController {
    async handle(req, res) {
        const id = req.query.id;
        const getUserDataByIdService = new GetUserDataByIdService_1.GetUserDataByIdService();
        const userdata = await getUserDataByIdService.execute({ id });
        return res.json(userdata);
    }
}
exports.GetUserDataByIdController = GetUserDataByIdController;
