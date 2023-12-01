import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

const command = await run(`gh release list`);

console.log(command);
