import * as fs from 'fs';

export class FileHelper {
  public static async read(
    fileDescriptor: number,
    offset: number,
    length: number,
  ): Promise<Buffer> {
    return await new Promise((resolve, reject) => {
      const buffer: Buffer = Buffer.alloc(length);

      fs.read(
        fileDescriptor,
        buffer,
        0,
        buffer.length,
        offset,
        (error: Error | null, bytesRead: number) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(buffer);
        },
      );
    });
  }

  public static async write(
    fileDescriptor: number,
    buffer: Buffer,
    offset: number,
  ): Promise<number> {
    return await new Promise((resolve, reject) => {
      fs.write(
        fileDescriptor,
        buffer,
        0,
        buffer.length,
        offset,
        (error: Error | null, written: number) => {
          if (error) {
            reject(error);

            return;
          }

          resolve(written);
        },
      );
    });
  }
}
