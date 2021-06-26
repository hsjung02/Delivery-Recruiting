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



router.get('/',(req,res)=>{  // login.html 화면에 표시
    res.sendFile(__dirname+'/login.html');
})

router.use('/',(req,res,next)=>{ //로그인 성공 시 쿠키 변경
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

router.post('/',(req,res)=>{ //로그인 시도 후 화면 표시
    
    var header;
    var temp='';
    var loginsuccess=0; //로그인 성공했는지. 성공했으면 1, 실패했으면 0
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
            if(loginsuccess==1){ //로그인 성공 시 화면 포시
                header = fs.readFileSync("./user_header.html", "utf8"); //회원 전용 헤더파일
                res.write(header);
                temp+=`<div class='title'>로그인에 성공했습니다</div>`
                temp+=`<input type='button' onClick="location.href='/'" value="주문하러 가기"></input>` // 홈 화면으로 리다이렉트하는 버튼
            }
            else if(loginsuccess==0){ //로그인 실패 시 화면 표시
                header = fs.readFileSync("./not_header.html", "utf8"); //비회원 전용 헤더파일
                res.write(header);
                temp+=`<div class='title'>로그인에 실패했습니다</div>`
                temp+=`<input type='button' onClick="location.href='/login'" value="다시 로그인하기"></input>` //로그인 화면으로 리다이렉트하는 버튼
            }
            res.write(temp);
            resolve();
        })
    }).then(()=>{
        var footer = fs.readFileSync("./footer.html", "utf8"); //풋터파일
        res.write(footer);
        res.end();
    })
    
})

