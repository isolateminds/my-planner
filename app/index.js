//add apps event lifecycle.

const EVENTS = Object.create(null);
const { app, Menu } = require("electron");
const menu = require("./menu");

EVENTS["window-all-closed"] = function winAllClosed() {
    app.exit();
}
// EVENTS["browser-window-focus"] = function winFocused(window) {};

module.exports = init.bind(EVENTS);

/**
 * @description subscribes event listeners to the main process application and returns app when its ready
 * @returns {Promise<Electron.App>} app
 */
function init() {
    var events = Object.keys(this);
    for (let event of events) {
        app.on(event, this[event]);
    }
    
    Menu.setApplicationMenu(menu);
    return new Promise(function handleAppInit(resolve) {
        app.whenReady().then(() => {
            return resolve(app);
        })
    });
}