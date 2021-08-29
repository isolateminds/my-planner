const fs = require("fs");
const fileOptions = { encoding: "utf-8" };
const {
    CONFIG_PATH,
    FILE_NOT_EXIST
} = require("../constants");
/**
 * @description turns a configuartion file in to a JSON parsable object.
 * @returns {Promise<object>}
 */
function loadConfig() {
    return new Promise(function loadExec(resolve, reject) {
        return fs.readFile(CONFIG_PATH, fileOptions, (err, data) => {
            if (err) {
                return reject(err);
            }
            var data = JSON.parse(data.toString(fileOptions.encoding));
            return resolve(data);
        })
    })
}
/**
 * @description creates a configuration file base on an Object created ideally in renderer.
 * @param {object} config configuration of aden
 * @returns {Promise<object>}
 */
function createConfig(config) {
    if (!(typeof config == "object")) {
        throw new TypeError(`expected config object`);
    }
    var data = JSON.stringify(config);
    return new Promise(function createExec(resolve) {
        return fs.writeFile(CONFIG_PATH, data, fileOptions, () => resolve(config));
    })
}
/**
 * @description check if the configuration file exists
 * @param path {string} absolute path to config file
 * @returns {Promise<boolean>}
 */
function configExists() {
    return new Promise(function existsExec(resolve, reject) {
        return fs.stat(CONFIG_PATH, (err, stats) => {
            if (err) {
                if (err.code == FILE_NOT_EXIST) {
                    return resolve(false);
                }
                return reject(err);
            }
            return resolve(stats.isFile());
        })
    })
};

/**
 * @param config {object}
 * @returns {Promise<object>} a config object
 */
function setConfig(config) {
    if (!(typeof config == "object")) {
        throw new TypeError(`expected config object`);
    }
    return new Promise(function setConfigExec(resolve, reject) {
        return configExists()
            .then(function onExists(exists) {
                if (!exists) {
                    return createConfig(config)
                        .then(resolve)
                        .catch(reject);
                }
                return loadConfig()
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject)
    })
}
module.exports = setConfig;
