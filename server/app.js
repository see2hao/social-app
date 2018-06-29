const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const cors = require('cors');
const password = require('passport');
const errorhandler = require('errorhandler');
// const routes = require('./routes');
const mysql =  require('mysql');
const PORT = 8080;

const app = express();

const sess = {
    secret: 'social app',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24*60*60,
    }
};

// app.set('env', 'production');
// process.env.MYSQL_URI = 'localhost';

const isProduction = app.get('env') === 'production';

if(isProduction){
    app.set('trust proxy', 1);
    session.cookie.secure = true;
}

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors());
app.use(compression());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(session(sess));
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})
if(!isProduction){
    app.use(errorhandler());
}
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.json({'errors': {
        message: err.message,
        error:{}
    }});
})
// app.use(routes);

//连接数据库
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    insecureAuth: true,
});

connection.connect(err=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Connected mysql successly.`);
    }
});

// app.get('/test', (req, res)=>{
//     console.log(req.body);
//     res.send('test');
// });

app.listen(PORT, ()=>{
    console.log(`App is listening at${PORT}`);
})