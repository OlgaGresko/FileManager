const parseArgs = () => {
    const args = process.argv.splice(2);
  
    const parsedArgs = args.map(arg => arg.replace(/^--/, ''))
    return parsedArgs;
  };
  
  export default parseArgs;
  