const path = require("path");
const { spawn } = require("child_process");
const { cron: appCron, workers: appWorkers } = require(process.cwd());

export default {
  command: "start",
  aliases: [],
  desc: "start a simulated firebase runtime of any-cloud",
  builder: yargs => {
    yargs.option("project", {
      alias: "p",
      type: "string",
      description: "firebase project id"
    });
  },
  handler: argv => {
    if (appWorkers) {
      console.log("worker queue not implemented for firebase yet");
    }
    if (appCron) {
      console.log("cron not implemented for firebase yet");
    }
    const args = ["serve"];
    if (argv.project) {
      args.push("--project");
      args.push(argv.project);
    }
    const child = spawn(
      require.resolve("firebase-tools/lib/bin/firebase"),
      args,
      { cwd: path.join(__dirname, "../../") }
    );

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("close", code => {
      console.log(`firebase process exited with code ${code}`);
      process.exit(0);
    });
  }
};
