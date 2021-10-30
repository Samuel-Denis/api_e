import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(tmpFolder, folder),
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    };
  },
};
