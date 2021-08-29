const init = require("./app");
const createWindow = require("./window");
const {
    PROG_WINDOW_OPS,
    MAIN_WINDOW_OPS,
    NO_PARENT,
    PROG_HTML,
    MAIN_HTML,
    BASE_CONFIG,
    DEV_MODE,
    UI_BUILD_FILE
} = require("./constants");
const {
    openSettings,
    makePDF
} = require("./listeners/ipcMain");
const setConfig = require("./utils/config");

//a binding object
const planner = Object.create(null);
//ipcMain Listeners returns closure
(function listen({ ipcMain }) {
    ipcMain.on("settings", openSettings.bind(this));
    ipcMain.on("PDF", makePDF.bind(this));
}.bind(planner))(require("electron"));

;; main();;
async function main() {
    try {
        planner.app = await init();
        planner.wProgress = await createWindow(PROG_WINDOW_OPS, PROG_HTML, NO_PARENT);
        planner.wProgress.show();
        planner.config = await setConfig(BASE_CONFIG);
        await stall(5000);
        planner.wMain = await createWindow(MAIN_WINDOW_OPS, MAIN_HTML, NO_PARENT);
        planner.wProgress.close();
        planner.wMain.show();
        // planner.wMain.openDevTools();
    } catch (error) {
        console.error(error);
    }
}

//for showing progress window
function stall(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//DEVELOPMENT ONLY
//Watches UI build file for changes
if (DEV_MODE) {
    let fs = require("fs");
    fs.watchFile(UI_BUILD_FILE, () => {
        return planner.wMain.reload();
    });
}

