import { rm } from "fs/promises";
import throwErrorMessage from "../utils/throwErrorMassage.js";

const remove = async (deletePath) => {
  try {
    await rm(deletePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      throwErrorMessage();
    }
  }
};

export default remove;
