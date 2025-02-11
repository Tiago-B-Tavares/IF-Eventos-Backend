import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

// Tipos auxiliares para melhorar a legibilidade
type EventoWithRelations = {
    id: string;
    nome: string;
    descricao: string | null;
    horario: string | null;
    dataInicio: Date | null;
    dataFim: Date | null;
    local: string | null;
    banner: string | null;
    organizadores: Array<{ organizador: { nome: string } }>;
    atividades: Array<{
        id: string;
        nome: string;
        local: string | null;
        horario: string | null;
        concomitante: boolean;
        descricao: string | null;
        vagas: number | null;
        tipo: string | null;
        data: Date | null;
        ch: number | null;
        qr_code_link: string | null;
        inscricoes: Array<{ participante: { nome: string; email: string } }>;
        organizadores: Array<{ organizador: { nome: string } }>;
    }>;
};

class ListAllEventosService {
    async execute(): Promise<EventoWithRelations[]> {
        try {
            // Fragmento para organizar a seleção de atividades
             console.time('ListAllEventosService')
            const atividadeSelect = {
                id: true,
                nome: true,
                local: true,
                horario: true,
                concomitante: true,
                descricao: true,
                vagas: true,
                tipo: true,
                data: true,
                ch: true,
                qr_code_link: true,
                inscricoes: {
                    select: {
                        participante: {
                            select: {
                                nome: true,
                                email: true,
                            },
                        },
                    },
                },
                organizadores: {
                    select: {
                        organizador: {
                            select: {
                                nome: true,
                            },
                        },
                    },
                },
            };

         
            const eventos = await prismaClient.evento.findMany({
                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    horario: true,
                    dataInicio: true,
                    dataFim: true,
                    local: true,
                    banner: true,
                    organizadores: {
                        select: {
                            organizador: {
                                select: {
                                    nome: true,
                                },
                            },
                        },
                    },
                    atividades: {
                        select: atividadeSelect, // Reutilização do fragmento
                    },
                },
            });
            console.timeEnd('ListAllEventosService')

            return eventos as unknown as EventoWithRelations[];
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : "Erro desconhecido ao listar eventos";
            
            throw new AppError(`Não foi possível listar os eventos: ${errorMessage}`, 500);
        }
    }
}

export { ListAllEventosService };