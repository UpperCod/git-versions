import { util } from "util";
import { exec } from "child_process";

const run = util.promisify(exec);

const command = await run(`gh release list`);

console.log(command);
