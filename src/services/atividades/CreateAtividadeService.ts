import { AppError } from '../../ErrorControl/AppError';
import prismaClient from '../../prisma';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import QRCode from 'qrcode';
import { $Enums } from '@prisma/client';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

interface AtividadeRequest {
    nome: string;
    descricao: string;
    local: string;
    horario: Date;
    vagas: number;
    tipo: $Enums.TipoAtividade;
    ch: number;
    data: string;
    concomitante: boolean;
    evento_id: string;
    organizador_id: string;
}

class CreateAtividadeService {
    // Método principal
    async execute({
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
        organizador_id,
    }: AtividadeRequest) {


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
        } catch (error) {
            console.error(error);
            throw new AppError("Erro ao cadastrar atividade", 500);
        }
    }

    // Valida se o organizador existe
    private async validateOrganizador(organizador_id: string) {
        const organizador = await prismaClient.organizador.findUnique({
            where: { id: organizador_id },
        });
        if (!organizador) {
            throw new AppError("Organizador não encontrado", 404);
        }
    }

    // Busca o nome do evento
    private async getEvento(evento_id: string) {
        const evento = await prismaClient.evento.findUnique({
            where: { id: evento_id },
            select: { nome: true },
        });
        if (!evento) {
            throw new AppError("Evento não encontrado", 404);
        }
        return evento;
    }

    // Cria a atividade
    private async createAtividade({
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
    }: Omit<AtividadeRequest, 'organizador_id'>) {
        return prismaClient.atividade.create({
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
    private async linkAtividadeToOrganizador(atividade_id: string, organizador_id: string) {
        await prismaClient.atividadeOrganizador.create({
            data: {
                atividade_id,
                organizador_id,
            },
        });
    }

    // Gera e faz upload do QR Code
    private async generateAndUploadQRCode({
        atividade_id

    }: {
        atividade_id: string;

    }) {
        // Dados incluídos no QR Code
        const qrCodeData = JSON.stringify({
            atividade_id,

        });

        const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData);

        return new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload(
                qrCodeDataUrl,
                { resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result?.secure_url as string);
                    }
                }
            );
        });
    }

    // Atualiza o registro da atividade com o link do QR Code
    private async saveQRCodeUrl(atividade_id: string, qrCodeUrl: string) {
        await prismaClient.atividade.update({
            where: { id: atividade_id },
            data: { qr_code_link: qrCodeUrl },
        });
    }
}
export { CreateAtividadeService };
