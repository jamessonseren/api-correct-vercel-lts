import winston from "winston";
import { promises as fs } from 'fs';
import { resolve } from 'path';

// Obtenha o caminho absoluto para o diretório "logs"
const logsDirectory = resolve(__dirname, '..','..','logs');

// Verifique se o diretório existe, se não existir, crie-o
async function ensureLogsDirectory() {
  try {
    await fs.stat(logsDirectory);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      // O diretório não existe, então crie-o
      await fs.mkdir(logsDirectory);
    } else {
      throw err;
    }
  }
}

// Chame a função para garantir que o diretório "logs" exista
ensureLogsDirectory().catch(err => console.error('Erro ao garantir a existência do diretório "logs":', err));
const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp( { format: "DD/MM/YYYY HH:mm:ss"} ),
        winston.format.json()
    ),
    transports: [ 
        new winston.transports.File({
            filename:"logs/app.log"
        }),
        new winston.transports.File({
            filename:"logs/error.log",
            level:'error'
        })
    ]
})

export { logger }
