const { BrowserWindow } = require("electron");
const loadHTML = require("./utils/loadHTML");

/**
 * @description creates a new BrowserWindow.
 * @param options {object} window options.
 * @param parent {BrowserWindow} browser window to be the parent window.
 * @returns {Promise<BrowserWindow>} Promise that resolves a new BrowserWindow.
 */
function createWindow(options, htmlFile, parent = null) {
    try {
        if (typeof options != "object") {
            throw new Error("window#createWindow options required")
        }
        if (typeof htmlFile != "string") {
            throw new Error("window#createWindow htmlFile is required");
        }

        return new Promise(function createWindowExec(resolve) {
            // To make the window display without visual flash we set show to false
            options = { ...options, show: false }
            if (parent != null) {
                if (!(parent instanceof BrowserWindow)) {
                    throw new Error("window#createWindow parent must be an instance of browser window");
                }
                options = { ...options, parent };
            }
            var window = new BrowserWindow(options);
            window.once("ready-to-show", function onReadyToShow() {
                return resolve(window);
            });

            return loadHTML.call(window, htmlFile);
        })
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }

}
module.exports = createWindow;


