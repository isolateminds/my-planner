const {
    SETTINGS_WINDOW_OPS,
    SETTINGS_HTML,
    NO_MENU
} = require("../constants");
const Schedule = require("../Schedule");
const createWindow = require("../window");
const $ = Object.create(null);
const { dialog } = require("electron");

$.openSettings = async function openSettings() {
    var wSettings;
    try {
        wSettings = await createWindow(SETTINGS_WINDOW_OPS, SETTINGS_HTML, this.wMain);
        wSettings.setMenu(NO_MENU);
        return wSettings.show();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
$.makePDF = async function makePDF(event, date, tasks) {
    var schedule = new Schedule(date);
    try {
        for (let task of tasks) {
            schedule.add(task);
        }
        let { filePath } = await dialog.showSaveDialog(this.wMain, { filters: [{ name: "Adobe PDF", extensions: ["pdf"] }] });
        if (filePath != null) {
            schedule.makePDF(filePath);
        }

    } catch (error) {
        console.error(error);
        process.exit(1);
    }

}

module.exports = Object.freeze($);