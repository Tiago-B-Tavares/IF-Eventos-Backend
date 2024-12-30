import { Request, Response } from 'express';

import { AppError } from '../../ErrorControl/AppError';
import { CheckOutUserService } from '../../services/appUser/CheckOutUserService';

class CheckOutUserController {
    async handle(req: Request, res: Response) {
        const { userId, atividade_id, distance } = req.body;


        try {
            if (!userId || !atividade_id || !distance) {
                throw new AppError("Os campos vazios ou indefinido.", 400);
            }

            const checkOutUserService = new CheckOutUserService();

            const checkOut = await checkOutUserService.execute({
                participante_id: userId,
                atividade_id: atividade_id,
                distance: distance
            });

            return res.status(200).json({
                message: "Check-out realizado com sucesso!",
                data: checkOut,
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

export { CheckOutUserController };
