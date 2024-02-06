import express, { Response, Request, NextFunction, Router } from 'express'
import {router} from './routes'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
// import { uploadImage } from './infra/shared/multer/multer-memory.config'

const app = express()
app.use(express.json({
  limit:'200mb'
}))
app.use(cors())


app.use(router)

app.get('/', (req: Request, res: Response) => {
    res.send("Application running successfully")
})



// // const storage = multer.memoryStorage()

// app.post('/upload-test', uploadImage.array('image'), async (req: Request, res: Response) => {
//   try {
//     if (!Array.isArray(req.files) || req.files.length === 0) {
//       throw new CustomError('Nenhuma imagem foi enviada.', 400);
//     }

//     const requestImages = req.files as Express.Multer.File[];

//     const uploadFields: string[] = ['face', 'document_front', 'document_back', 'face_and_document_front'];
//     const imagesMap: Record<string, string> = {};

//     requestImages.forEach((file, index) => {
//       const fieldName = uploadFields[index];
//       const base64Image = file.buffer.toString('base64');
//       imagesMap[fieldName] = base64Image;
//     });

//     // const base64Images = requestImages.map((file) => file.buffer.toString('base64'));

//     console.log('Imagens convertidas para base64:', imagesMap);

//     return res.json(imagesMap);
//   } catch (err: any) {
//     return res.status(err.statusCode).json({
//       error: err.message,
//     });
//   }
// });
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(3333, () => console.log("Server running on PORT 3333"))