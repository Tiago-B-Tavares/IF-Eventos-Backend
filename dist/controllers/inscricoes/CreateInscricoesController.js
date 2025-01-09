"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInscricoesController = void 0;
const CreateInscricaoService_1 = require("../../services/inscricoes/CreateInscricaoService");
class CreateInscricoesController {
    async handle(req, res) {
        const { atividade_id, participante_id } = req.body;
        const createInscricaoService = new CreateInscricaoService_1.CreateInscricaoService();
        try {
            const inscrever = await createInscricaoService.execute({
                atividade_id,
                participante_id,
            });
            return res.status(201).json(inscrever);
        }
        catch (error) {
            console.error("Erro ao criar inscrição:", error.message);
            return res.status(400).json({
                error: "Erro ao criar inscrição.",
                message: error.message,
            });
        }
    }
}
exports.CreateInscricoesController = CreateInscricoesController;
