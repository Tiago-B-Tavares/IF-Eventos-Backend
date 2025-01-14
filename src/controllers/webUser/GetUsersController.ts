import { GetUsersService } from "../../services/webUser/GetUsersService";
import { Request, Response } from "express";

class GetUsersController {
    async handle(req:Request, res:Response ) {

        try {
            const getUsersService = new GetUsersService();

            const user = await getUsersService.execute();
           
            return res.json(user);

        } catch (error) {
            throw new Error("erro: " + error);
            
        }


    }
}
export { GetUsersController }