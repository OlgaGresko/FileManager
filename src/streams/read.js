import fs from 'fs';
import os from 'os';

const read = async (filePath) => {

    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => process.stdout.write(chunk.toString() + os.EOL) );
};

export default read;