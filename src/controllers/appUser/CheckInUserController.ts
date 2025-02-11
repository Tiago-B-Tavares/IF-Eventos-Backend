import { Request, Response } from 'express';
import { CheckInUserService } from '../../services/appUser/CheckInUserService';
import { AppError } from '../../ErrorControl/AppError';

class CheckinUserController {
    async handle(req: Request, res: Response) {
        const { userId, atividade_id, distance } = req.body;



        try {
            if (!userId || !atividade_id || !distance) {
                throw new AppError("Os campos vazios ou indefinido.", 400);
            }

            const checkInUserService = new CheckInUserService();

            const checkIn = await checkInUserService.execute({
                participante_id: userId,
                atividade_id: atividade_id,
                distance: distance
            });

            return res.status(200).json({
                message: "Check-in realizado com sucesso!",
                data: checkIn,
            });

        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ error: error.message });
            }

            console.error("Erro interno:", error);
            return res.status(500).json({ error: "Erro interno no servidor." });
        }
    }
}

export { CheckinUserController };
