import { Request, Response } from 'express'
import { GetUserProfileService } from '../../services/webUser/GetUserProfileService'

class GetUserProfileController {
    async handle(req: Request, res: Response) {
   

            const id = req.query.id as string;

            if (!id) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const detailWebUserService = new GetUserProfileService()

            const user = await detailWebUserService.execute(id)

            return res.json(user);

    }
}

export { GetUserProfileController }