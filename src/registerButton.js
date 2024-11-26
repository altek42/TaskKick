const { v4: uuidv4 } = require('uuid');
const { exec } = require('child_process');

let buttons = []

const log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`)
}

const renderResponse = (res, error) => {
    if (error) {
        return res.render('message', {
            sucess: null,
            error: `Błąd: ${error.message}`,
        });
    }
    return res.render('message', {
        sucess: 'Udało się! 🎉',
        error: null
    });
}

const registerButton = (app, label, description, command) => {
    const newUuid = uuidv4();
    const path = '/' + newUuid;
    log(`Register ${path} as "${label}"`)

    buttons.push({ 
        label: label, 
        action: path, 
        description
    })

    app.post(path, (req, res) => {
        const userIp = req.ip
        const userAgent = req.get('User-Agent');
        const forwardedIp = req.headers['x-forwarded-for']
        log(`IP: ${userIp}, Path: ${path}, Label: ${label} User-Agent: ${userAgent}, Forward IP: ${forwardedIp}`)

        exec(command, (error, stdout, stderr) => {
            if (error || stderr) {
                log(`IP: ${userIp}, Path: ${path}, Error: ${error ? error.message : stderr}`);
                return renderResponse(res, error || new Error(stderr));
            }
            log(`IP: ${userIp}, Path: ${path}, Success: ${stdout}`);
            return renderResponse(res, error)
        });
    });
}

module.exports = {
    registerButton,
    buttons
}
