const path = require("path");
const DEV_MODE = process.env.NODE_ENV == "development";
const preloadPath = DEV_MODE ? path.resolve(process.cwd(), "preload.js") : path.resolve(__dirname, "../", "preload.js");
module.exports = {
    main: {
        width: 800,
        height: 700,
        title: "My Planner",
        resizable:false,
        minWidth: 300,
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: true,
            devTools: true
        }
    },
    progress: {
        transpaent: true,
        title: "progress",
        width: 220,
        height: 165,
        frame: false,
        resizable: false,
        center: true,
        alwaysOnTop: true,
    },
    settings: {
        width: 300,
        height: 600,
        resizable: false,
        center: true,
        movable: false,
        title: "Settings",
        modal: true,
        webPreferences: {
            preload: preloadPath,
            nodeIntegration: true,
            devTools: true
        }
    },

}