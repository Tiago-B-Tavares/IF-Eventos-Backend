import { Request, Response } from "express";
import { GetEventStatisticsService } from "../../services/evento/GetEventStatisticsService";

class GetEventStatisticsController {
    async handle(req: Request, res: Response) {
        


        const statisticsService = new GetEventStatisticsService();
        try {
            const statistics = await statisticsService.execute();
            return res.json(statistics);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { GetEventStatisticsController };
