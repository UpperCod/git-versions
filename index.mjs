import { util } from "node:util";
import { exec } from "node:child_process";

const run = util.promisify(exec);

const command = await run(`gh release list`);

console.log(command);
