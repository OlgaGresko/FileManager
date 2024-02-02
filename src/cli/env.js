import parseArgs from "./args.js";

const prefix = 'name='

const parseEnv = () => {
    const newArray = parseArgs(); 
    // const resultArray = [];
    let value;
      
    newArray.map(arg => {
        if (arg.startsWith(prefix)) {
            const newPrefix = prefix.replace('=', '');
            value = arg.replace(prefix, '');

            // resultArray.push(`${newPrefix}=${value}`);
        }
    });
  
    // const resultString = resultArray.join('; ');
    return value;
  };

 export default parseEnv;