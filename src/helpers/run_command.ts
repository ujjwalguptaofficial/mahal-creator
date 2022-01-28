import { exec } from "child_process";

export const runCommand = function (cmd: string, finishMessage?: string) {
    return new Promise(function (res, rej) {
        var command = exec(cmd);
        command.on("error", function (err) {
            console.error(err);
        })
        command.stdout.on('data', function (data) {
            console.log(data.toString());
        });
        command.stderr.on('data', function (data) {
            console.log(data.toString());
        });
        command.on('exit', function (code) {
            res(code);
        });
    });
}