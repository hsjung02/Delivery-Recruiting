//====================모듈 export==================//
const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hyunseo02',
    database: 'delivery',
    multipleStatements: true
});
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
const logoutRouter = require('./logout.js');
app.use('/out',logoutRouter);
const loginRouter = require('./login.js');
app.use('/login',loginRouter);
const joinRouter = require('./join.js');
app.use('/join',joinRouter);
const orderRouter = require('./order.js');
app.use('/order',orderRouter);
const neworderRouter = require('./neworder.js');
app.use('/neworder',neworderRouter);
const mypageRouter = require('./mypage.js');
app.use('/page',mypageRouter);
//====================모듈 export 끝==============//


app.get('/',(req,res)=>{
    var header;
    if(Object.keys(req.cookies).length != 0){
        header = fs.readFileSync("./user_header.html","utf8");
        res.write(header);
    }
    else{
        header = fs.readFileSync("./not_header.html","utf8");
        res.write(header);
    }
    new Promise((resolve, reject)=>{
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`, (err, result)=>{ //load all words from database, insert each of them in a table
            if(err) throw err;
            var temp=`<div class='title'>주문 목록</div>`;
            temp+=`<div class='orderbox'>`;
            for(var key in result){
                temp+=`<ul><input type='submit' value='${result[key].TABLE_NAME}' onClick="location.href='/order/${result[key].TABLE_NAME}'"></input></ul>`
            }
            temp+='</div>';
            res.write(temp);
            resolve();
        })
    }).then(()=>{
        var footer = fs.readFileSync("./footer.html", "utf8");
        res.write(footer);
        res.end();
    })
})

app.listen(8080,()=>console.log('server running on port 8080'))