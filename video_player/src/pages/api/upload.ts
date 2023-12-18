import type { NextApiRequest, NextApiResponse } from 'next'
import { Request  , Response} from 'express';
import multer from 'multer';
import fs from 'fs'


type Data = {
  message?: string,
  error? : string
}
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export default async function handler(
  req: NextApiRequest & Request, res: NextApiResponse<Data> & Response
) {
 if(req.method === "POST")
 {
  try {
    await new Promise<void>((resolve, reject) => {
      upload.single('file')(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    const uploadedFile = req.file;
    if(uploadedFile !== undefined)
    {        
      const fileBuffer = uploadedFile.buffer;
      let fileContents = fileBuffer.toString();
      fs.writeFileSync("./public/chapters.vtt", fileContents, 'utf-8');
      res.status(200).json({ message: 'Chapters added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 }
}
