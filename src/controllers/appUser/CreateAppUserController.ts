import { Request, Response } from 'express';
import { CreateAppUserService } from '../../services/appUser/CreateAppUserService';

class CreateAppUserController {
    async handle(req: Request, res: Response) {
        const { data } = req.body; // Acessando o campo "data" diretamente

        if (!data || !data.email_addresses || !Array.isArray(data.email_addresses)) {
            return res.status(400).json({ message: "Estrutura de dados inválida ou dados ausentes." });
        }

        const email = data.email_addresses[0]?.email_address;
        const firstName = data.first_name;
        const lastName = data.last_name;
        const id = data.id
        if (!email || !firstName || !lastName) {
            return res.status(400).json({ message: "Nome completo ou email não encontrados no payload fornecido." });
        }

        const name = `${firstName} ${lastName}`;


        // Aqui você pode adicionar a lógica para salvar os dados
        const createAppUserService = new CreateAppUserService();
        const user = await createAppUserService.execute({
            id: id,
            nome: name,
            email: email,
            senha: "1234",
            idade: 12,
            sexo: 'M'
        });

        return res.status(201).json(user);


    }
}

export { CreateAppUserController };
