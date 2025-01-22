// controllers/UserController.ts
import { Request, Response } from "express";
import { UserService } from "../../services/appUser/UserService";


export class UserController {
   
    async create(req: Request, res: Response): Promise<Response> {
        const { id, email, nome, senha } = req.body;
        console.log(id, email, nome, senha);
        if (!id || !email || !nome || !senha) {
            return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
        }
        try {

            const userService = new UserService();
            const user = await userService.createUser({ id, email, nome, senha });
            return res.status(201).json(user);
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error);
            return res.status(500).json({ error: "Erro ao criar usuário" });
        }
    }
}
