import { spawn, execSync } from "child_process";

export const runCmdSync = function (cmd) {
    execSync(cmd, { stdio: 'inherit' });
}