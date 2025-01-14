import { Response, Request} from "express";
import { UpdateAppUserService } from "../../services/appUser/UpdateAppUserService";

class UpdateAppUserController {
    async handle(req: Request, res: Response) {
        const id = req.query.id as string
        const { nome, email } = req.body;

        const updateAppUserService = new UpdateAppUserService();

        const alterUser = await updateAppUserService.execute({
            id,
            nome,
            email,
            
        })

        return res.json(alterUser);

    }
}
export { UpdateAppUserController }