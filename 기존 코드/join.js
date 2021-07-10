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


router.get('/',(req,res)=>{ // 회원가입 페이지 표시 (join.html)
    res.sendFile(__dirname+'/join.html'); 
})

router.post('/',(req,res)=>{
    var check=0; // 이미 존재하는 회원인지 체크, 1이면 이미 가입된 전화번호
    console.log(req.body.tel, req.body.pw);
    new Promise((resolve, reject)=>{
        new Promise((resolve, reject)=>{
                db.query(`SELECT tel FROM users`,(err,result)=>{
                    if(err)throw err;
                    for(var key in result){
                        if(result[key].tel == req.body.tel){
                            check=1; 
                        }
                    }
                    resolve();
                })
            }).then(()=>{
                if(check==1)
                    db.query(`DELETE FROM users WHERE tel='${req.body.tel}'`,(err,result)=>{ //데이터베이스에서 삭제 후
                        if(err)throw err;
                    })
                resolve();
            })
    }).then(()=>{
        db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`,(err,result)=>{ // 회원정보 생성
                if(err)throw err;
            })
    })
    res.redirect(302,'/'); //홈 화면으로 리다이렉트
})

