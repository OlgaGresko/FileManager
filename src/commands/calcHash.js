import { createReadStream } from "fs";
import { Transform, pipeline } from "stream";
import crypto from "crypto";
import throwErrorMessage from "../utils/throwErrorMessage.js";
import parseCommandArgs from "../utils/parseCommandArgs.js";

const calculateHash = async (line) => {
  const [filePath] = parseCommandArgs(line);

  const readable = createReadStream(filePath);

  const transform = new Transform({
    transform(chunk, enc, cb) {
      const hash = crypto.createHash("sha256").update(chunk).digest("hex");
      console.log(hash);
      cb();
    },
  });

  pipeline(readable, transform, (err) => {
    if (err) {
      throwErrorMessage();
    }
  });
};

export default calculateHash;
