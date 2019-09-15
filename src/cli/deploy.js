const path = require("path");
const { spawn, spawnSync } = require("child_process");
const { cron: appCron, workers: appWorkers } = require(process.cwd());

export default {
  command: "deploy",
  aliases: [],
  desc: "deploy your application to firebase",
  builder: yargs => {},
  handler: argv => {
    console.log("here");
    if (appWorkers) {
      console.log("worker queue not implemented for firebase yet");
    }
    if (appCron) {
      console.log("cron not implemented for firebase yet");
    }
    const args = ["deploy", ...process.argv.slice(3)];
    const newCwd = path.join(__dirname, "../../");
    const appCodeLinkPath = path.join(newCwd, "AC_APPLICATION_CODE");
    console.log("clearing app code stage");
    spawnSync("rm", ["-rf", appCodeLinkPath]);
    console.log("copying new app code to stage");
    spawnSync("cp", ["-R", process.cwd(), appCodeLinkPath]);
    console.log("deploying with firebase");
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
