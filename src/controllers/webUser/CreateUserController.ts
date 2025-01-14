import { Request, Response } from 'express';
import { CreateUserService } from '../../services/webUser/CreateUserService';


class CreateUserController {
  async handle(req: Request, res: Response) {

    const { nome, email, senha, googleId } = req.body;
    
    try {

      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        nome,
        email,
        senha,
        googleId,
      });

      return res.json(user);

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }
}

export { CreateUserController };
