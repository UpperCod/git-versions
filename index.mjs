import { promisify } from "util";
import { exec } from "child_process";

const run = promisify(exec);

//Debounce to secure github updates to your services by declaring last
await new Promise((resolve) => setTimeout(resolve, 1000));

const [, owner, repo, tag] = process.env.GITHUB_WORKFLOW_REF.match(
  /([^\/]+)\/([^\/]+).+@refs\/tags\/(.+)/
);

const { stdout } = await run(
  `gh api -H "Accept: application/vnd.github+json" -H "X-GitHub-Api-Version: 2022-11-28" /repos/${owner}/${repo}/releases/latest`
);

const last = JSON.parse(stdout);

console.log({ owner, repo, tag, last: last?.tag_name });

if (last.tag_name !== tag) {
  throw `Version ${tag} is not latest`;
}
