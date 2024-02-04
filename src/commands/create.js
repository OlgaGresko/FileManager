import { writeFile } from "fs/promises";
import { join } from "path";
import throwErrorMessage from "../utils/throwErrorMessage.js";

const create = async (name) => {
    try {
        await writeFile(join(process.cwd(), name), "", { flag: "wx" });
    } catch {
        throwErrorMessage();
    }
};

export default create;