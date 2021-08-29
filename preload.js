process.once("loaded", () => {
  const { contextBridge, ipcRenderer } = require("electron")
  contextBridge.exposeInMainWorld("electron", {
    on(eventName, callback) {
      return ipcRenderer.on(eventName, callback);
    },
    send(eventName, ...args) {
      return ipcRenderer.send(eventName, ...args);
    }
  })
})