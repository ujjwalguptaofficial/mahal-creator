import { readFileSync } from "fs";
import * as Path from "path";

export const getPackageVersion = function () {
    const pathOfPackage = Path.join(__dirname, ".././package.json");
    const contents = readFileSync(pathOfPackage, {
        encoding: "utf8"
    });
    const packageInfo = JSON.parse(contents);
    return packageInfo.version;
}