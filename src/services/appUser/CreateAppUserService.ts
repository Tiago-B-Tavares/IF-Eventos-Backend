import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import { Sex } from '../../enums/participantSex'

interface AppUserRequest {
    id?:string
    nome: string;
    email: string;
    senha: string
    sexo?:'M';
    idade?:12;
}
class CreateAppUserService {
    async execute({ id, nome, email, senha, sexo , idade }: AppUserRequest) {
   
       
        try {
            if (!email) {
                throw new Error("Email incorreto!");
            }
            const userAlreadyExists = await prismaClient.participante.findFirst({
                where: {
                    email: email
                }
            })
            if (userAlreadyExists) {
               
                
                throw new Error("Email já existe!");
                
            }

            const senhaHash = await hash(senha, 8)

            const user = await prismaClient.participante.create({
                data: {
                    id: id,
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    sexo:sexo,
                    idade:idade
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    sexo:true,
                    idade:true
                }
            })

            return user;
        } catch (error) {

            return { message: `Não foi possível cadastrar usuário devido ao erro: ${error} ` }
        }
    }
}
export { CreateAppUserService }