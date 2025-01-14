
import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";


class ListAllEventosService {
    async execute() {
        try {
            const listEventos = await prismaClient.evento.findMany({

                select: {
                    id: true,
                    nome: true,
                    descricao: true,
                    horario: true,
                    dataInicio: true,
                    dataFim: true,
                    local: true,
                    banner: true,
                    _count: true,
                    organizadores: {
                        select: {
                            organizador: {
                                select: {
                                    nome: true
                                }
                            }
                        }
                    },
                    atividades: {
                        select: {
                            id: true,
                            nome: true,
                            local: true,
                            horario: true,
                            concomitante: true,
                            descricao: true,
                            vagas: true,
                            tipo: true,
                            ch: true,
                            qr_code_link: true,
                            inscricoes: {
                                select: {
                                    participante: {
                                        select: {
                                            nome: true,
                                            email: true,
                                         
                                        }
                                    }
                                }
                            },                        
                            organizadores: {
                                select: {
                                    organizador: {
                                        select: {
                                            nome: true,
                                        }
                                    }
                                }
                            }
                        },
                    }

                }
            });


            return listEventos;
        } catch (error) {
          throw new  AppError(`Não foi possível listar os Eventos devido ao erro:`, error )
        }
    }
}

export { ListAllEventosService };
