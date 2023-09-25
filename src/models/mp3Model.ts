import { IDatabase, IMain } from 'pg-promise';

export interface Mp3File {
  id?: number;
  filename: string;
  mp3_data: Buffer;
}

export class Mp3Repository {
  constructor(
    private db: IDatabase<unknown>,
    private pgp: IMain,
  ) {}

  // Insert an MP3 file into the database
  async insertMp3File(mp3: Mp3File): Promise<Mp3File> {
    return this.db.one<Mp3File>(
      'INSERT INTO mp3_files (filename, mp3_data) VALUES ($1, $2) RETURNING *',
      [mp3.filename, mp3.mp3_data],
    );
  }

  // Retrieve an MP3 file by its ID
  async getMp3FileById(id: number): Promise<Mp3File | null> {
    return this.db.oneOrNone<Mp3File>(
      'SELECT * FROM mp3_files WHERE id = $1',
      id,
    );
  }

  // Retrieve an MP3 file by its fileName
  async getMp3FileByFileName(fileName: string): Promise<Mp3File | null> {
    return this.db.oneOrNone<Mp3File>(
      'SELECT * FROM mp3_files WHERE filename = $1',
      fileName,
    );
  }

  // Retrieve all MP3 files from the database
  async getAllMp3Files(): Promise<Mp3File[]> {
    return this.db.any('SELECT * FROM mp3_files');
  }

  // Delete an MP3 file by its ID
  async deleteMp3FileById(id: number): Promise<void> {
    await this.db.none('DELETE FROM mp3_files WHERE id = $1', id);
  }
}
