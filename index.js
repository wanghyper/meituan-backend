const express = require('express');
const router = require('./routes/index.js');
const db = require('./mongodb/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

const MongoStore = connectMongo(session);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({}));
app.use(cookieParser());
app.use(session({
    name: 'mt-session',
    secret: 'meituan',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000,
    },
    store: new MongoStore({
        url: config.sessionStorageURL
    })
}));
router(app);
console.log(`service start on ${config.port}`);
app.listen(config.port);

