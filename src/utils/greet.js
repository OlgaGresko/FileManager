import parseEnv from "./env.js";
import capitalizeFirstLetter from "./capitalizeFirstLetter.js";

const greet = () => {
  const name = capitalizeFirstLetter(parseEnv());
  console.log(`Welcome to the File Manager, ${name}`);
};

export default greet;
