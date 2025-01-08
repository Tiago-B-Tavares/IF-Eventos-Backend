import { Request, Response } from "express";
import { GetEventStatisticsService } from "../../services/evento/GetEventStatisticsService";

class GetEventStatisticsController {
    async handle(req: Request, res: Response) {
        const eventoId= req.query.id ;
console.log("controller: ",eventoId);

        const statisticsService = new GetEventStatisticsService();
        try {
            const statistics = await statisticsService.execute(eventoId as string);
            return res.json(statistics);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { GetEventStatisticsController };
