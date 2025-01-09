"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColaboradorEventoController = void 0;
const CreateColaboradorEventoService_1 = require("../../services/colaboradores/CreateColaboradorEventoService");
class CreateColaboradorEventoController {
    async handle(req, res) {
        const { organizador_id, evento_id } = req.body;
        const service = new CreateColaboradorEventoService_1.CreateColaboradorEventoService();
        const result = await service.execute({ organizador_id, evento_id });
        console.log(result);
        if (result.error) {
            return res.status(400).json({ message: result.message });
        }
        return res.status(200).json({ message: result.message });
    }
}
exports.CreateColaboradorEventoController = CreateColaboradorEventoController;
