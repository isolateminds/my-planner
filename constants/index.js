const $ = Object.create(null);
const {
    progress,
    main,
    settings,
} = require("../options/window");
const path = require("path");

/* APP */
const PROG_WINDOW_OPS = progress
const MAIN_WINDOW_OPS = main;
const SETTINGS_WINDOW_OPS = settings;
const PROG_HTML = "progress.html";
const MAIN_HTML = "main.html";
const SETTINGS_HTML = "settings.html";
const NO_PARENT = null;
const NO_MENU = null;
const NO_OP = function () { };
const IS_WIN = process.platform == "win32";
const IS_OSX = process.platform == "darwin";
const CONFIG_PATH = path.resolve(process.cwd(), "planner.config.json");
const FILE_NOT_EXIST = "ENOENT";
const BASE_CONFIG = {
    ///TODO
}
const DEV_MODE = process.env.NODE_ENV == "development";
const UI_BUILD_FILE = path.resolve(process.cwd(), "assets", "js", "main.js");

$["PROG_WINDOW_OPS"] = PROG_WINDOW_OPS;
$["MAIN_WINDOW_OPS"] = MAIN_WINDOW_OPS;
$["SETTINGS_WINDOW_OPS"] = SETTINGS_WINDOW_OPS;
$["PROG_HTML"] = PROG_HTML;
$["MAIN_HTML"] = MAIN_HTML;
$["SETTINGS_HTML"] = SETTINGS_HTML;
$["NO_PARENT"] = NO_PARENT;
$["NO_OP"] = NO_OP;
$["NO_MENU"] = NO_MENU;
$["IS_WIN"] = IS_WIN;
$["IS_OSX"] = IS_OSX;
$["CONFIG_PATH"] = CONFIG_PATH;
$["FILE_NOT_EXIST"] = FILE_NOT_EXIST;
$["BASE_CONFIG"] = BASE_CONFIG;
$["DEV_MODE"] = DEV_MODE;
$["UI_BUILD_FILE"] = UI_BUILD_FILE;

module.exports = Object.freeze($);