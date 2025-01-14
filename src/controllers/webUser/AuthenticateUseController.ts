import { Request, Response } from 'express'
import { AuthenticateUserService } from '../../services/webUser/AuthenticateUserService'

class AuthenticateUseController {
    async handle(req: Request, res: Response) {
        
        const { email, password } = req.body;
        console.log("controller: ", email, password);
        
        const authUserService = new AuthenticateUserService();

        const auth = await authUserService.execute({
            email,
            password 
        });

       
        return res.json(auth);
    }
}
export { AuthenticateUseController }
