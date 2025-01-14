import { AppError } from '../../ErrorControl/AppError';
import prismaClient from '../../prisma';
import { v2 as cloudinary } from 'cloudinary';
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
            // Valida a existência de evento e organizador 
            const [evento, organizador] = await Promise.all([
                prismaClient.evento.findUnique({
                    where: { id: evento_id },
                    select: { nome: true },
                }),
                prismaClient.organizador.findUnique({
                    where: { id: organizador_id },
                }),
            ]);

            if (!evento) throw new AppError("Evento não encontrado", 404);
            if (!organizador) throw new AppError("Organizador não encontrado", 404);

            // Cria a atividade no banco de dados
            const atividade = await prismaClient.atividade.create({
                data: {
                    nome,
                    descricao,
                    local,
                    horario,
                    data,
                    vagas,
                    ch,
                    tipo,
                    concomitante,
                    evento: {
                        connect: { id: evento_id },
                    },
                },
                select: { id: true, nome: true },
            });

            // Associa a atividade ao organizador em paralelo com o QR Code
            const [_, qrCodeUrl] = await Promise.all([
                prismaClient.atividadeOrganizador.create({
                    data: {
                        atividade_id: atividade.id,
                        organizador_id,
                    },
                }),
                this.generateAndUploadQRCode(atividade.id),
            ]);

            // Atualiza o registro da atividade com o link do QR Code
            await prismaClient.atividade.update({
                where: { id: atividade.id },
                data: { qr_code_link: qrCodeUrl },
            });

            return { message: "Atividade cadastrada com sucesso!", qrCodeUrl };
        } catch (error) {
            console.error(error);
            throw new AppError("Erro ao cadastrar atividade", 500);
        }
    }

    // Gera e faz upload do QR Code
    private async generateAndUploadQRCode(atividade_id: string): Promise<string> {
        const qrCodeData = JSON.stringify({ atividade_id });

        const qrCodeDataUrl = await QRCode.toDataURL(qrCodeData);

        // Usando versão assíncrona do Cloudinary
        const result = await cloudinary.uploader.upload(qrCodeDataUrl, {
            resource_type: 'image',
        });

        return result.secure_url;
    }
}

export { CreateAtividadeService };
