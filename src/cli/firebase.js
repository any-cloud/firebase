const path = require("path");
const { spawn } = require("child_process");

export default {
  command: "firebase",
  aliases: [],
  desc: "use the firebase cli",
  builder: yargs => {},
  handler: () => {
    const args = process.argv.slice(3);
    const child = spawn(
      require.resolve("firebase-tools/lib/bin/firebase"),
      args,
      { cwd: path.join(__dirname, "../../"), env: process.env }
    );

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on("close", code => {
      console.log(`firebase process exited with code ${code}`);
      process.exit(0);
    });
  }
};
