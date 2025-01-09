"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeUserPermissionsController = void 0;
const ChangeUserPermissionsService_1 = require("../../services/admin/ChangeUserPermissionsService");
class ChangeUserPermissionsController {
    async handle(req, res) {
        const id = req.query.id;
        const role = req.body.role;
        const changeUserPermissionsService = new ChangeUserPermissionsService_1.ChangeUserPermissionsService();
        const change = await changeUserPermissionsService.execute({
            organizador_id: id,
            role: role
        });
        return res.json(change);
    }
}
exports.ChangeUserPermissionsController = ChangeUserPermissionsController;
