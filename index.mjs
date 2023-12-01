import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

const [, version] = process.env.GITHUB_REF.match(/refs\/tags\/(.+)/);

await new Promise((resolve) => setTimeout(resolve, 5000));

const { stdout } = await run(`gh release list`);

/**
 * @type {Object.<string,{version,latest}>}
 */
const versions = {};

stdout.split(/\n/).forEach((line) => {
  if (!line) return;
  const [, version, latest = ""] = line.match(/([^\t]+)\t([\w]+)?\t/);
  versions[version] = { version, latest: latest.toLowerCase() === "latest" };
});

console.log({ version, versions, env: process.env });

if (!versions[version].latest) {
  process.exit();
}
