const { menubar } = require("menubar");
const isDev = require("electron-is-dev");

const mb = menubar({
  index: isDev
    ? "http://localhost:3000"
    : `file://${__dirname}/../dist/index.html`,
  browserWindow: {
    webPreferences: {
      nodeIntegration: true
    }
  }
});

mb.on("ready", () => {
  console.log("Application is ready");
});
mb.on("after-create-window", () => {
  console.log();
});
