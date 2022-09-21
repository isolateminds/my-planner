//configuration of top windows Menu
const { Menu } = require("electron");

const template = [
    {
        label: "File",
        submenu: [
            {
                label: "Quit",
                click: () => process.exit(0)
            }
        ]
    },
];

const menu = Menu.buildFromTemplate(template)
module.exports = menu;