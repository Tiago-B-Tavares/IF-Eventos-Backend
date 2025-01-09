"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckOutUserController = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const CheckOutUserService_1 = require("../../services/appUser/CheckOutUserService");
class CheckOutUserController {
    async handle(req, res) {
        const { userId, atividade_id, distance } = req.body;
        try {
            if (!userId || !atividade_id || !distance) {
                throw new AppError_1.AppError("Os campos vazios ou indefinido.", 400);
            }
            const checkOutUserService = new CheckOutUserService_1.CheckOutUserService();
            const checkOut = await checkOutUserService.execute({
                participante_id: userId,
                atividade_id: atividade_id,
                distance: distance
            });
            return res.status(200).json({
                message: "Check-out realizado com sucesso!",
                data: checkOut,
            });
        }
        catch (error) {
            if (error instanceof AppError_1.AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.error("Erro interno:", error);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}
exports.CheckOutUserController = CheckOutUserController;
