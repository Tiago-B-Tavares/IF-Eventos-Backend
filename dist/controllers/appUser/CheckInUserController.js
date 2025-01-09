"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckinUserController = void 0;
const CheckInUserService_1 = require("../../services/appUser/CheckInUserService");
const AppError_1 = require("../../ErrorControl/AppError");
class CheckinUserController {
    async handle(req, res) {
        const { userId, atividade_id, distance } = req.body;
        console.log("controller: ", userId, atividade_id, distance);
        try {
            if (!userId || !atividade_id || !distance) {
                throw new AppError_1.AppError("Os campos vazios ou indefinido.", 400);
            }
            const checkInUserService = new CheckInUserService_1.CheckInUserService();
            const checkIn = await checkInUserService.execute({
                participante_id: userId,
                atividade_id: atividade_id,
                distance: distance
            });
            return res.status(200).json({
                message: "Check-in realizado com sucesso!",
                data: checkIn,
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
exports.CheckinUserController = CheckinUserController;
