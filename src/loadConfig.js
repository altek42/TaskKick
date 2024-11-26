const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const { logger } = require("./logger");

const loadConfig = () => {
  try {
    const filePath = path.join(__dirname, "../config.yml");
    const fileContent = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContent);
  } catch (e) {
    logger("Error: Błąd podczas ładowania pliku YAML:", e.message);
    return [];
  }
};

module.exports = {
  loadConfig,
};
