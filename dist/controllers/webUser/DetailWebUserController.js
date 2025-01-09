"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailWebUserController = void 0;
const DetailWebUserService_1 = require("../../services/webUser/DetailWebUserService");
class DetailWebUserController {
    async handle(req, res) {
        const user_id = req.user_id;
        const detailWebUserService = new DetailWebUserService_1.DetailWebUSerService();
        const user = await detailWebUserService.execute(user_id);
        return res.json(user);
    }
}
exports.DetailWebUserController = DetailWebUserController;
