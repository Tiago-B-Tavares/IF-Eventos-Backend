"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAtividadeController = void 0;
const UpdateAtividadesService_1 = require("../../services/atividades/UpdateAtividadesService");
const client_1 = require("@prisma/client");
class UpdateAtividadeController {
    async handle(req, res) {
        const id = req.query.id;
        let { nome, descricao, local, horario, vagas, ch, tipo, concomitante } = req.body;
        if (tipo !== client_1.$Enums.TipoAtividade) {
            tipo = client_1.$Enums.TipoAtividade.Oficina;
        }
        const horarioFormatado = new Date();
        horarioFormatado.setHours(Number(horario.slice(0, 2)) - 3);
        horarioFormatado.setMinutes(Number(horario.slice(-2)));
        const updateAtividadesService = new UpdateAtividadesService_1.UpdateAtividadesService();
        try {
            Number(ch);
            const atividade = await updateAtividadesService.execute({
                id, local, horario: horarioFormatado, ch, tipo, concomitante, nome, descricao, vagas
            });
            return res.json(atividade);
        }
        catch (error) {
            console.error("Erro ao atualizar a atividade:", error);
            return res.status(500).json({ message: `Erro ao atualizar a atividade: ${error.message}` });
        }
    }
}
exports.UpdateAtividadeController = UpdateAtividadeController;
