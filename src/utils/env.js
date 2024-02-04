import parseArgs from "./args.js";

const prefix = "username=";

const parseEnv = () => {
  const newArray = parseArgs();
  let value;

  newArray.map((arg) => {
    if (arg.startsWith(prefix)) {
      value = arg.replace(prefix, "");
    }
  });
  return value;
};

export default parseEnv;
