const util = require("node:util");
const exec = util.promisify(require("node:child_process").exec);

const command = await exec(`gh release list`);

console.log(command);
