"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventStatisticsController = void 0;
const GetEventStatisticsService_1 = require("../../services/evento/GetEventStatisticsService");
class GetEventStatisticsController {
    async handle(req, res) {
        const eventoId = req.query.id;
        console.log("controller: ", eventoId);
        const statisticsService = new GetEventStatisticsService_1.GetEventStatisticsService();
        try {
            const statistics = await statisticsService.execute(eventoId);
            return res.json(statistics);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
exports.GetEventStatisticsController = GetEventStatisticsController;
