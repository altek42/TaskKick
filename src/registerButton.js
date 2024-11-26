const { v4: uuidv4 } = require("uuid");
const { exec } = require("child_process");
const { logger } = require("./logger");

let buttons = [];

const renderResponse = (res, error) => {
  if (error) {
    return res.render("message", {
      sucess: null,
      error: `Błąd: ${error.message}`,
    });
  }
  return res.render("message", {
    sucess: "Udało się! 🎉",
    error: null,
  });
};

const registerButton = (app, label, description, command) => {
  const newUuid = uuidv4();
  const path = "/" + newUuid;
  logger(`Register ${path} as "${label}"`);

  buttons.push({
    label: label,
    action: path,
    description,
  });

  app.post(path, (req, res) => {
    const userIp = req.ip;
    const userAgent = req.get("User-Agent");
    const forwardedIp = req.headers["x-forwarded-for"];
    logger(
      `IP: ${userIp}, Path: ${path}, Label: ${label} User-Agent: ${userAgent}, Forward IP: ${forwardedIp}`
    );

    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        logger(
          `IP: ${userIp}, Path: ${path}, Error: ${
            error ? error.message : stderr
          }`
        );
        return renderResponse(res, error || new Error(stderr));
      }
      logger(`IP: ${userIp}, Path: ${path}, Success: ${stdout}`);
      return renderResponse(res, error);
    });
  });
};

module.exports = {
  registerButton,
  buttons,
};
