import throwErrorMessage from "./throwErrorMessage.js";

const parseOsArgs = (line) => {
  const [_, argWithPrefix] = line.trim().split(" ");
  if (!argWithPrefix.includes("--")) {
    throwErrorMessage();
  }
  const arg = argWithPrefix.replace("--", "");
  return arg;
};

export default parseOsArgs;
