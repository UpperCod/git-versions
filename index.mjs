import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

const [, version] = process.env.GITHUB_REF.match(/ref\/tags\/(.+)/);

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

if (!versions[version].latest) {
  process.exit();
}
