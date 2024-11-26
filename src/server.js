const express = require('express');
const app = express();

const { registerButton, buttons } = require('./registerButton')


app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

registerButton(app, 'Odczytaj plik', 'Wyświetla zawartość pliku testowego', 'cat /mnt/c/Project/TaskKick/test.txt')
registerButton(app, 'Restart aplikacji', 'Restartuje aplikację na serwerze.', 'cat /mnt/c/Project/TaskKick/test.txt')


app.get('/', (req, res) => {
    res.render('index', { buttons, error: null });
});

app.listen(8080, () => {
    console.log('Serwer run at http://localhost:8080');
});
