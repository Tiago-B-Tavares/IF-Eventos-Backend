"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEventoService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
class UpdateEventoService {
    async execute({ id, nome, descricao, dataInicio, dataFim, horario, local }) {
        try {
            const updadeEvento = await prisma_1.default.evento.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    descricao: descricao,
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    horario: horario,
                    local: local,
                }
            });
            return { message: "alterado com susesso!" };
        }
        catch (error) {
            throw new AppError_1.AppError(`Não foi possível remover este evento`, error);
        }
    }
}
exports.UpdateEventoService = UpdateEventoService;
