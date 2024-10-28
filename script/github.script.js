const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const deploy = async () => {
  const sourceRepo = path.resolve(process.cwd(), ".."); // Path to the source repository
  const targetRepo = "/Users/bipingiri/personal/test"; // Path to the target repository
  const commitMessage = "Automated commit with folder copy"; // Commit message
  console.log("object");
  if (!fs.existsSync(targetRepo)) {
    fs.mkdirSync(targetRepo, { recursive: true });
  }

  // Step 1: Sync files
  try {
    execSync(
      `rm -rf "${targetRepo}/*" && rsync -av --exclude='.git' "${sourceRepo}/" "${targetRepo}/"`
    );
    process.chdir(targetRepo);
    console.log(process.cwd());
    console.log("Initializing Git repository in dist folder...");
    // await spawnPromise("git", ["init"]);

    console.log("Adding all files to Git...");
    await spawnPromise("git", ["add", "."]);

    console.log("Committing with initial commit message...");
    await spawnPromise("git", ["commit", "-m", "second  commit"]);

    // try {
    //   await spawnPromise("git", ["remote", "get-url", "origin"]);
    // } catch (error) {
    //   console.log("Adding remote origin...");
    //   await spawnPromise("git", ["branch", "-M", "main"]);
    //   await spawnPromise("git", [
    //     "remote",
    //     "add",
    //     "origin",
    //     "https://github.com/Bipin7giri/deployment-test.git",
    //   ]);
    // }

    await spawnPromise("git", ["config", "pull.rebase", "false"]);

    await spawnPromise("git", ["pull", "origin", "main"]);

    await spawnPromise("git", ["push", "origin", "main"]);
  } catch (error) {
    console.error("Error copying files:", error);
    process.exit(1);
  }
};

const spawnPromise = (command, args = []) => {
  return new Promise((resolve, reject) => {
    const cp = spawn(command, args);

    cp.stdout.on("data", (data) => {
      console.log(`stdout: ${data.toString()}`);
    });

    cp.stderr.on("data", (data) => {
      console.error(`stderr: ${data.toString()}`);
    });

    cp.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command '${command}' failed with exit code ${code}`));
      }
    });
  });
};

deploy();
