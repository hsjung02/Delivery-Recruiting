const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.post('/',(req,res)=>{
    var check=false;
    new Promise((resolve, reject)=>{
        new Promise((resolve, reject)=>{
                db.query(`SELECT tel FROM users`,(err,result)=>{
                    if(err)throw err;
                    for(var key in result){
                        if(result[key].tel == req.body.tel){
                            check=true;
                        }
                    }
                    resolve();
                })
            }).then(()=>{
                if(check==true)
                    db.query(`DELETE FROM users WHERE tel='${req.body.tel}'`,(err,result)=>{ //데이터베이스에서 삭제 후
                        if(err)throw err;
                    })
                resolve();
            })
    }).then(()=>{
        db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`,(err,result)=>{ // 회원정보 생성
                if(err)throw err;
            })
            res.json({check:check});

    })
})