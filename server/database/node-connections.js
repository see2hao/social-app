const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '********',
    user: 'root',
    password: '',
});

connection.connect(err=>{
    if(err){
        console.log(err);
    }else{
        console.log(connection.threadId);
    }
});
