import ffmpeg from 'fluent-ffmpeg';
import { Mp3Repository, Mp3File } from '../models/mp3Model';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export class Mp4ToMp3Service {
  constructor(private mp3Repository: Mp3Repository) {}

  convertMp4ToMp3(mp4Buffer: Buffer, outputFileName: string): Promise<Mp3File> {
    const uniqueIdentifier = Date.now().toString();
    const tempDirPath = path.join(__dirname, '../tmp');

    const tempOutputPath = path.join(
      tempDirPath,
      `${uniqueIdentifier}_output.mp3`,
    );

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        // Create a readable stream from mp4Buffer
        const mp4Stream = new Readable();
        mp4Stream.push(mp4Buffer);
        mp4Stream.push(null); // Mark the end of the stream

        // Perform the MP4 to MP3 conversion using fluent-ffmpeg
        ffmpeg()
          .input(mp4Stream) // Use the readable stream as input
          .toFormat('mp3')
          .on('end', async () => {
            try {
              // Read the converted MP3 file into a buffer
              const mp3Buffer = fs.readFileSync(tempOutputPath);

              // Create an object with the MP3 file data
              const mp3Data: Mp3File = {
                filename: outputFileName,
                mp3_data: mp3Buffer,
              };

              // Store the converted MP3 file in the database
              const insertedMp3 =
                await this.mp3Repository.insertMp3File(mp3Data);

              // Clean up temporary files
              fs.unlinkSync(tempOutputPath);

              resolve(insertedMp3);
            } catch (error) {
              reject(error);
            }
          })
          .on('error', (err) => {
            reject(err);
          })
          .pipe(fs.createWriteStream(tempOutputPath)); // Pipe the output to the temporary output file
      } catch (error) {
        reject(error);
      }
    });
  }

  getMp3FileByFileName(filename: string) {
    return this.mp3Repository.getMp3FileByFileName(filename);
  }
}
