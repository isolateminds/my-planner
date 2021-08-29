//configuration of top windows Menu
const { Menu, ipcMain } = require("electron");

const template = [
    {
        label: "File",
        submenu: [
            {
                label: "quit",
                click: () => process.exit(0)
            }
        ]
    },
    {
        label: "Settings",
        submenu: [
            {
                label: "configure",
                click: () => {
                    return ipcMain.emit("settings");
                }
            }
        ]
    }
];

const menu = Menu.buildFromTemplate(template)
module.exports = menu;