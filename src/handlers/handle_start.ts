import { runCommand } from "../helpers";

export const handleDevStart = function () {
    runCommand("npm run dev").then(function (code) {
        if (code != 0) {
            console.log(`Unable to start dev server, process exited with code ${code}`);
        }
    });
}