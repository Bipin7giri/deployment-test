const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const sourceRepo = process.cwd(); // Path to the source repository
const targetRepo = path.join(path.dirname(process.cwd())); // Path to the target repository
const commitMessage = "Automated commit with folder copy"; // Commit message

// Step 1: Check if the target repo exists
if (!fs.existsSync(targetRepo)) {
  console.error("Target repository does not exist!");
  process.exit(1);
}

try {
  // Step 2: Copy files (excluding node_modules) from sourceRepo to targetRepo
  execSync(`rsync -av --exclude=node_modules ${sourceRepo}/ ${targetRepo}/`, {
    stdio: "inherit",
  });

  // Step 3: Perform git add, commit, and push operations
  execSync(`git -C ${targetRepo} add .`, { stdio: "inherit" });
  execSync(`git -C ${targetRepo} commit -m "${commitMessage}"`, {
    stdio: "inherit",
  });
  execSync(`git -C ${targetRepo} push`, { stdio: "inherit" });

  console.log("Files copied and changes pushed successfully!");
} catch (error) {
  console.error("An error occurred:", error.message);
}
