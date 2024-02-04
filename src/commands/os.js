import os from "os";

const osCommand = (arg) => {
    if (arg === "EOL") {
        console.log(os.EOL);
      } else if (arg === "cpus") {
        const allCpus = os.cpus();
        console.log(`Overall amount of CPUS is ${allCpus.length}`);
        allCpus.map((cpu, index) => {
          console.log(
            `${index + 1}. CPU model is ${cpu.model}, clock rate (in GHz) is ${
              cpu.speed / 1000
            }`
          );
        });
      } else if (arg === "homedir") {
        console.log(os.homedir());
      } else if (arg === "username") {
        const info = os.userInfo();
        console.log(info.username);
      } else if (arg === "architecture") {
        console.log(os.arch());
      }
}

export default osCommand;