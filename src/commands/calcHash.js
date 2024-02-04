import { createReadStream } from "fs";
import { Transform, pipeline } from "stream";
import crypto from "crypto";
import throwErrorMessage from "../utils/throwErrorMassage.js";

const calculateHash = async (filePath) => {
  const readable = createReadStream(filePath);

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const hash = crypto.createHash("sha256").update(chunk).digest("hex");
      console.log(hash);
      cb();
    },
  });

  pipeline(readable, transform, err => {
    if (err) {
      throwErrorMessage();
    }
  });
};

export default calculateHash;