const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

mongoose.connect('mongodb+srv://admin:admin@cluster0.yahed.mongodb.net/BO_DB?retryWrites=true&w=majority', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
   .then(db => console.log('[OK] Соединение с БД установлено'))
   .catch(err => console.error(err));

app.use('/api/boosters', require('./routes/boosters'));

const users = require('./routes/users');
app.use('/api/users', users);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use('/', express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, '../dist/index.html'));
})
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Порт - ${PORT}`);
})

const ifaces = require('os').networkInterfaces();
const localhost = Object.keys(ifaces).reduce((host,ifname) => {
    let iface = ifaces[ifname].find(iface => !('IPv4' !== iface.family || iface.internal !== false));
    return iface? iface.address : host;
}, '127.0.0.1');
console.log(`Сервер доступен по ${localhost}:${PORT} или localhost:${PORT}`);