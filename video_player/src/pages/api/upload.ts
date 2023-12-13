import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';

type Data = {
  message?: string,
  error? : string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(req.method === "POST")
  {
    try
    {
      const fileBuffer = req.body;
      let fileContent = fileBuffer.toString();
      fs.writeFileSync("./public/chapters.vtt", fileContent, 'utf-8');
      res.status(200).json({ message: 'Chapters added successfully' });
    }catch(error : any)
    {
        console.error('Error uploading file:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
}
