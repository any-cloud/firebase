const path = require("path");
const fs = require("fs");
const { spawn, spawnSync } = require("child_process");
const { cron: appCron, workers: appWorkers } = require(process.cwd());

export default {
  command: "start",
  aliases: [],
  desc: "start a simulated firebase runtime of any-cloud",
  builder: yargs => {},
  handler: argv => {
    if (appWorkers) {
      console.log("worker queue not implemented for firebase yet");
    }
    if (appCron) {
      console.log("cron not implemented for firebase yet");
    }
    const args = ["serve", ...process.argv.slice(3)];
    const newCwd = path.join(__dirname, "../../");
    const appCodeLinkPath = path.join(newCwd, "AC_APPLICATION_CODE");
    spawnSync("rm", ["-rf", appCodeLinkPath]);
    fs.symlinkSync(process.cwd(), appCodeLinkPath);
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
