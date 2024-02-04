import { createReadStream } from 'fs';
import { Transform, pipeline } from 'stream';
import crypto from 'crypto';
import throwErrorMessage from '../utils/throwErrorMassage.js';

const calculateHash = async (filePath) => {
  const readable = createReadStream(filePath);
  const writable = process.stdout;

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const hash = crypto.createHash('sha256').update(chunk).digest('hex');
      this.push(hash + '\n');
      cb();
    },
  });

  pipeline(readable, transform, writable, err => {
    if (err) {
      throwErrorMessage();
    }
  });
};

export default calculateHash;