const init = require("./app");
const createWindow = require("./window");
const {
    MAIN_WINDOW_OPS,
    NO_PARENT,
    MAIN_HTML,
    BASE_CONFIG,
    DEV_MODE,
    UI_BUILD_FILE
} = require("./constants");
const {
    makePDF
} = require("./listeners/ipcMain");
    
const setConfig = require("./utils/config");

//a binding object
const planner = Object.create(null);
//ipcMain Listeners returns closure
(function listen({ ipcMain }) {
    ipcMain.on("PDF", makePDF.bind(this));
}.bind(planner))(require("electron"));

;; main();;
async function main() {
    try {
        planner.app = await init();
        planner.config = await setConfig(BASE_CONFIG);
        planner.wMain = await createWindow(MAIN_WINDOW_OPS, MAIN_HTML, NO_PARENT);
        planner.wMain.show();
    } catch (error) {
        console.error(error);
    }
}

//DEVELOPMENT ONLY
//Watches UI build file for changes
if (DEV_MODE) {
    let fs = require("fs");
    fs.watchFile(UI_BUILD_FILE, () => {
        return planner.wMain.reload();
    });
}

