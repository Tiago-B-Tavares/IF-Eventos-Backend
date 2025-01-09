import { Request, Response } from "express";
import { UpdateAtividadesService } from "../../services/atividades/UpdateAtividadesService";
import { $Enums } from '@prisma/client';
class UpdateAtividadeController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string;
        let { nome, descricao, local, horario, vagas, ch, tipo, concomitante } = req.body;
        if (tipo !== $Enums.TipoAtividade) {
            tipo = $Enums.TipoAtividade.Oficina;
        }

        const horarioFormatado = new Date();
        horarioFormatado.setHours(Number(horario.slice(0, 2)) - 3);
        horarioFormatado.setMinutes(Number(horario.slice(-2)))


        const updateAtividadesService = new UpdateAtividadesService();

        try {
            Number(ch)
            const atividade = await updateAtividadesService.execute({
                id, local, horario: horarioFormatado, ch, tipo, concomitante, nome, descricao, vagas
            });


            return res.json(atividade);

        } catch (error: any) {
            console.error("Erro ao atualizar a atividade:", error);


            return res.status(500).json({ message: `Erro ao atualizar a atividade: ${error.message}` });
        }
    }
}

export { UpdateAtividadeController };
