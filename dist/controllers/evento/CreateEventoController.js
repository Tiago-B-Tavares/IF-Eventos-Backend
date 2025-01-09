"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEventoController = void 0;
const CreateEventoService_1 = require("../../services/evento/CreateEventoService");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
class CreateEventoController {
    async handle(req, res) {
        const { nome, descricao, dataInicio, dataFim, horario, local, organizador_id } = req.body;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: "File is required" });
        }
        const file = req.files['file'];
        try {
            // Realiza o upload para o Cloudinary
            const resultFile = await new Promise((resolve, reject) => {
                cloudinary_1.v2.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(result);
                    }
                }).end(file.data);
            });
            const createEventoService = new CreateEventoService_1.CreateEventoService();
            const evento = await createEventoService.execute({
                nome,
                descricao,
                dataInicio,
                dataFim,
                horario,
                banner: resultFile.secure_url,
                local,
                organizador_id,
            });
            return res.json(evento);
        }
        catch (error) {
            console.error("Error uploading file:", error);
            return res.status(500).json({ error: "Error uploading file" });
        }
    }
}
exports.CreateEventoController = CreateEventoController;
