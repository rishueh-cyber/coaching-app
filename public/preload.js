import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('#electron', {
  ipcRenderer: {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
    send: (channel, ...args) => ipcRenderer.send(channel, ...args),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    once: (channel, func) =>
      ipcRenderer.once(channel, (event, ...args) => func(...args)),
  },
  app: {
    getVersion: () => ipcRenderer.invoke('get-app-version'),
    getPath: () => ipcRenderer.invoke('get-app-path'),
  },
});
