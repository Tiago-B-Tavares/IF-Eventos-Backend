"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAtividadeService = void 0;
const AppError_1 = require("../../ErrorControl/AppError");
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("cloudinary");
const qrcode_1 = __importDefault(require("qrcode"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreateAtividadeService {
    // Método principal
    async execute({ nome, descricao, local, horario, vagas, ch, tipo, data, concomitante, evento_id, organizador_id, }) {
        try {
            // Valida se o organizador existe
            await this.validateOrganizador(organizador_id);
            // Busca o nome do evento
            const evento = await this.getEvento(evento_id);
            // Cria a atividade no banco de dados
            const atividade = await this.createAtividade({
                nome,
                descricao,
                local,
                horario,
                vagas,
                ch,
                tipo,
                data,
                concomitante,
                evento_id,
            });
            // Associa a atividade ao organizador
            await this.linkAtividadeToOrganizador(atividade.id, organizador_id);
            // Gera e faz o upload do QR Code
            const qrCodeUrl = await this.generateAndUploadQRCode({
                atividade_id: atividade.id
            });
            // Atualiza o registro da atividade com o link do QR Code
            await this.saveQRCodeUrl(atividade.id, qrCodeUrl);
            return { message: "Atividade cadastrada com sucesso!", qrCodeUrl };
        }
        catch (error) {
            console.error(error);
            throw new AppError_1.AppError("Erro ao cadastrar atividade", 500);
        }
    }
    // Valida se o organizador existe
    async validateOrganizador(organizador_id) {
        const organizador = await prisma_1.default.organizador.findUnique({
            where: { id: organizador_id },
        });
        if (!organizador) {
            throw new AppError_1.AppError("Organizador não encontrado", 404);
        }
    }
    // Busca o nome do evento
    async getEvento(evento_id) {
        const evento = await prisma_1.default.evento.findUnique({
            where: { id: evento_id },
            select: { nome: true },
        });
        if (!evento) {
            throw new AppError_1.AppError("Evento não encontrado", 404);
        }
        return evento;
    }
    // Cria a atividade
    async createAtividade({ nome, descricao, local, horario, vagas, ch, tipo, data, concomitante, evento_id, }) {
        return prisma_1.default.atividade.create({
            data: {
                nome,
                descricao,
                local,
                horario,
                data,
                vagas: Number(vagas),
                ch: Number(ch),
                tipo,
                concomitante,
                evento: {
                    connect: { id: evento_id },
                },
            },
            select: {
                id: true,
                nome: true,
            },
        });
    }
    // Associa a atividade ao organizador
    async linkAtividadeToOrganizador(atividade_id, organizador_id) {
        await prisma_1.default.atividadeOrganizador.create({
            data: {
                atividade_id,
                organizador_id,
            },
        });
    }
    // Gera e faz upload do QR Code
    async generateAndUploadQRCode({ atividade_id }) {
        // Dados incluídos no QR Code
        const qrCodeData = JSON.stringify({
            atividade_id,
        });
        const qrCodeDataUrl = await qrcode_1.default.toDataURL(qrCodeData);
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(qrCodeDataUrl, { resource_type: 'image' }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result === null || result === void 0 ? void 0 : result.secure_url);
                }
            });
        });
    }
    // Atualiza o registro da atividade com o link do QR Code
    async saveQRCodeUrl(atividade_id, qrCodeUrl) {
        await prisma_1.default.atividade.update({
            where: { id: atividade_id },
            data: { qr_code_link: qrCodeUrl },
        });
    }
}
exports.CreateAtividadeService = CreateAtividadeService;
