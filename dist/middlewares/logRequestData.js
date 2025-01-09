"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequestData = void 0;
const logRequestData = (req, res, next) => {
    console.log('--- Requisição Recebida ---');
    console.log(`Método: ${req.method}`);
    console.log(`URL: ${req.url}`);
    // Adiciona o tempo de início da requisição
    const startTime = Date.now();
    // Escuta o evento `finish` para calcular a duração da requisição
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        console.log(`Status: ${res.statusCode} - Tempo de resposta: ${duration}ms`);
        console.log('--- Fim da Requisição ---\n');
    });
    next();
};
exports.logRequestData = logRequestData;
