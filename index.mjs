import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

await new Promise((resolve) => setTimeout(resolve, 1000));

const [, owner, repo, tag] = process.env.GITHUB_WORKFLOW_REF.match(
  /([^\/]+)\/([^\/]+).+@refs\/tags\/(.+)/
);

const { stdout } = await run(
  `gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" /repos/${owner}/${repo}/releases/latest`
);

const last = JSON.parse(stdout);

console.log({ owner, repo, tag, last });

if (last.tag_name !== version) {
  process.exit();
}

// const { stdout } = await run(`gh release list`);

// /**
//  * @type {Object.<string,{version,latest}>}
//  */
// const versions = {};

// stdout.split(/\n/).forEach((line) => {
//   if (!line) return;
//   const [, version, latest = ""] = line.match(/([^\t]+)\t([\w]+)?\t/);
//   versions[version] = { version, latest: latest.toLowerCase() === "latest" };
// });

// console.log({ version, versions, env: process.env });

// if (!versions[version].latest) {
//   process.exit();
// }
