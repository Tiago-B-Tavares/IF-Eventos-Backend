import { Role } from '../../enums/permissionRoles';
import prismaClient from '../../prisma';
class ChangeUserPermissionsService {
    async execute({ organizador_id, role }: { organizador_id: string, role: Role }) {
        try {


            const changeRole = await prismaClient.organizador.update({
                where: {
                    id: organizador_id
                },
                data: {
                    role: role
                },
                select:{
                    nome: true,
                    role:true,

                }
            })
      
            
            return "Permissoes atualizadas!"
        } catch (error) {
            return "erro ao atualizar permissões"
        }
    }
} export { ChangeUserPermissionsService }