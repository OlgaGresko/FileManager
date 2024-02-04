import parseEnv from "./env.js";
import capitalizeFirstLetter from "./capitalizeFirstLetter.js";

const name = capitalizeFirstLetter(parseEnv());

export const greet = () => {
  console.log(`Welcome to the File Manager, ${name}`);
};

export const sayBye = () => {
  console.log(`Thank you for using File Manager, ${name}, goodbye!`);
};
