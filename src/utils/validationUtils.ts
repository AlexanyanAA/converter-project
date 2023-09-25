import { Mp3Repository } from '../models/mp3Model';

export async function isFilenameUnique(
  mp3Repository: Mp3Repository,
  filename: string,
): Promise<boolean> {
  const mp3File = await mp3Repository.getMp3FileByFileName(filename);
  return !mp3File; // Returns true if the filename doesn't exist
}

export function isMp4File(file: Express.Multer.File): boolean {
  // Check if the file has a .mp4 extension
  return file && file.originalname.endsWith('.mp4');
}
