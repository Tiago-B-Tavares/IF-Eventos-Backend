import App from "next/app";
import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';
import { AppError } from "../../ErrorControl/AppError";
import { throws } from "assert";

interface updateAppUserRequest {
    id: string;
    nome: string;
    email: string;
  
}

class UpdateAppUserService {
    async execute({ id, nome, email}:updateAppUserRequest) {
        
        
        try {

            if (!id) {
                new AppError("Nao foi possivel alterar o usuario", 500)
            }

            const alteredUser = await prismaClient.participante.update({
                where: {
                    id: id
                },
                data: {
                    nome: nome,
                    email: email,
                 
                }
            })
           
       
            return alteredUser
        } catch (error) {
            return  new AppError("Nao foi possivel alterar o usuario devido ao erro: \n " + error + "", 500)
        }


    }
}
export { UpdateAppUserService }