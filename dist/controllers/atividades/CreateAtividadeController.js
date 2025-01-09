"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAtividadeController = void 0;
const CreateAtividadeService_1 = require("../../services/atividades/CreateAtividadeService");
const client_1 = require("@prisma/client");
class CreateAtividadeController {
    async handle(req, res) {
        try {
            let { nome, descricao, local, horario, data, vagas, ch, tipo, concomitante, organizador_id } = req.body;
            if (tipo !== client_1.$Enums.TipoAtividade) {
                tipo = client_1.$Enums.TipoAtividade.Oficina;
            }
            const evento_id = req.query.id;
            const createAtividadeService = new CreateAtividadeService_1.CreateAtividadeService();
            let activityTime;
            if (horario) {
                const [hours, minutes] = horario.split(':');
                const currentDate = new Date();
                currentDate.setHours(Number(hours) - 3, Number(minutes), 0, 0);
                activityTime = currentDate;
            }
            const atividade = await createAtividadeService.execute({
                nome,
                descricao,
                local,
                horario: activityTime,
                vagas: Number(vagas),
                ch: Number(ch),
                tipo: tipo,
                concomitante: !!concomitante,
                data,
                evento_id,
                organizador_id,
            });
            return res.json(atividade);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.CreateAtividadeController = CreateAtividadeController;
