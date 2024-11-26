const express = require("express");
const path = require("path");

const app = express();

const { registerButton, buttons } = require("./registerButton");
const { loadConfig } = require("./loadConfig");
const { logger } = require("./logger");

const config = loadConfig();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

config.buttons.forEach((button) => {
  registerButton(app, button.label, button.description, button.command);
});

app.get("/", (req, res) => {
  res.render("index", { buttons, error: null });
});

app.listen(config.port, () => {
  logger(`Serwer run at http://localhost:${config.port}`);
});
