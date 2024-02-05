const parseCommandArgs = (line) => {
    const args = line.trim().split(" ");
    return args.slice(1);
}

export default parseCommandArgs;