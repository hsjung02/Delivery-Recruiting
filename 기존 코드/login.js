const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hyunseo02',
    database: 'delivery'
});
const fs = require('fs');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;



router.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html');
})

router.use('/',(req,res,next)=>{
    var loginsuccess=0;
    new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM users`,(err,result)=>{
            if(err)throw err;
            for(var key in result){
                if(result[key].tel==req.body.tel && result[key].pw==req.body.pw)loginsuccess=1;
            }
            resolve();
        })
    }).then(()=>{
        if(loginsuccess==1){
            
            res.cookie("tel",req.body.tel);
        }
        next();
    })
    
})

router.post('/',(req,res)=>{
    
    var header;
    var temp='';
    var loginsuccess=0;
    new Promise((resolve,reject)=>{
        new Promise((resolve, reject)=>{
            db.query(`SELECT * FROM users`,(err,result)=>{
                if(err)throw err;
                for(var key in result){
                    if(result[key].tel==req.body.tel && result[key].pw==req.body.pw)loginsuccess=1;
                }
                resolve();
            })
        }).then(()=>{
            if(loginsuccess==1){
                header = fs.readFileSync("./user_header.html", "utf8");
                res.write(header);
                temp+=`<div class='title'>로그인에 성공했습니다</div>`
                temp+=`<input type='button' onClick="location.href='/'" value="주문하러 가기"></input>`
            }
            else if(loginsuccess==0){
                header = fs.readFileSync("./not_header.html", "utf8");
                res.write(header);
                temp+=`<div class='title'>로그인에 실패했습니다</div>`
                temp+=`<input type='button' onClick="location.href='/login'" value="다시 로그인하기"></input>`
            }
            res.write(temp);
            resolve();
        })
    }).then(()=>{
        var footer = fs.readFileSync("./footer.html", "utf8");
        res.write(footer);
        res.end();
    })
    
})

