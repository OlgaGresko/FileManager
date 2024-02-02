const parseArgs = () => {
    const args = process.argv.splice(2);
  
    const parsedArgs = args.map(arg => arg.replace(/^--/, ''))
    // console.log(parsedArgs)
    return parsedArgs;
  };
  
  export default parseArgs;
  