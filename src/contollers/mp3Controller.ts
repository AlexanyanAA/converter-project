import { Request, Response } from 'express';
import { Mp4ToMp3Service } from '../services/mp3Service';
import { db, pgp } from '../db/db';
import { Mp3Repository } from '../models/mp3Model';
import { isFilenameUnique, isMp4File } from '../utils/validationUtils';

// Create an instance of Mp3Repository
const mp3Repository = new Mp3Repository(db, pgp);

// Create an instance of Mp4ToMp3Service
const mp4ToMp3Service = new Mp4ToMp3Service(mp3Repository);

export const uploadAndConvertMp4 = async (req: Request, res: Response) => {
  try {
    const { file } = req;
    const filename = file!.originalname;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if the file is in mp4 format
    if (!isMp4File(file)) {
      return res.status(400).json({ error: 'File must be in mp4 format' });
    }

    const cleanedFileName = cleanFileName(filename);

    // Check if the filename is unique
    const isUnique = await isFilenameUnique(mp3Repository, cleanedFileName);

    if (!isUnique) {
      return res.status(400).json({
        error:
          'File with this name already exists. Please choose a different name.',
      });
    }

    // Call the convertMp4ToMp3 method to convert the uploaded MP4 file
    const mp3File = await mp4ToMp3Service.convertMp4ToMp3(
      file.buffer,
      cleanedFileName,
    );

    // Respond with the converted MP3 file data or a success message
    res.status(201).json({
      message: 'MP4 file converted to MP3',
      fileName: mp3File.filename,
    });
  } catch (error) {
    console.error('Error converting MP4 to MP3:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export async function getMp3FileByFileName(req: Request, res: Response) {
  try {
    const { filename } = req.params;

    const mp3File = await mp4ToMp3Service.getMp3FileByFileName(filename);

    if (mp3File) {
      res.status(200).json(mp3File);
    } else {
      res.status(404).json({ error: 'MP3 file not found' });
    }
  } catch (error) {
    console.error('Controller: Error fetching MP3 file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

function cleanFileName(fileName: string) {
  // Remove the '.mp4' extension
  const withoutExtension = fileName.replace('.mp4', '');

  return withoutExtension;
}
