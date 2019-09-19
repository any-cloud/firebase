import { init } from "@any-cloud/core";
const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");

export default {
  command: "start",
  aliases: [],
  desc: "start a simulated firebase runtime of any-cloud",
  builder: yargs => {},
  handler: async argv => {
    const args = ["serve", ...process.argv.slice(3)];
    const newCwd = path.join(__dirname, "../../");
    const appCodeLinkPath = path.join(newCwd, "AC_APPLICATION_CODE");
    spawnSync("rm", ["-rf", appCodeLinkPath]);
    fs.symlinkSync(process.cwd(), appCodeLinkPath);
    console.log("adding app as dependency");
    spawnSync("yarn", ["link"], { cwd: appCodeLinkPath });
    spawnSync("yarn", ["link", "app"], { cwd: newCwd });
    const child = spawn(
      require.resolve("firebase-tools/lib/bin/firebase"),
      args,
      { cwd: newCwd, env: process.env }
    );

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("close", code => {
      console.log(`firebase process exited with code ${code}`);
      process.exit(0);
    });
  }
};
