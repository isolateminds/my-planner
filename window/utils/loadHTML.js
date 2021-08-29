const path = require("path");
const fs = require("fs");
const { BrowserWindow } = require("electron");
const {
    DEV_MODE
} = require("../../constants");

/**
 * @description calls browserWindow.loadFile() after checking for file existance inside root/html/* 
 * @param {string} fName html file name
 * @returns void 
 */
function loadHTML(fName) {
    try {
        if (!(typeof fName == "string")) {
            throw new TypeError(`utils#loadHTML fName should be typeof string recieved ${typeof fName}`);
        }
        if (!(this instanceof BrowserWindow)) {
            throw new Error("utils#loadHTML 'this' should be instance of browser window");
        }
        var dir = DEV_MODE ? process.cwd():path.resolve(__dirname, "../../");
        var location = path.resolve(`${dir}`, "html", fName);
        var fileExists = fs.existsSync(location);
        if (!fileExists) {
            throw new Error(`utils#loadHTML ${location} does not exist`);
        }
        return this.loadFile(location);
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
}
module.exports = loadHTML;