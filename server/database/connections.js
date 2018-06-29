const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    insecureAuth: true
});

//connect testing 
// connection.connect(err=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(`Mysql is running, the thread id is ${connection.threadId}.`);
//     }
// });

module.exports = connection;
