import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/webUser/UpdateUserService'

class UpdateUserController{
    async handle( req: Request, res: Response){

        const id  = req.query.id as string;

        const { nome, email, senha } = req.body;
        
        const updateUserService = new UpdateUserService();

        const user = await updateUserService.execute({
                id, 
                nome, 
                email, 
                senha
            });
        
        return res.json({
           user
        });

    }
}
export { UpdateUserController }