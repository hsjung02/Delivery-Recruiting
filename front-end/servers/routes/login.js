const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

// router.use('/',(req,res,next)=>{ //로그인 성공 시 쿠키 변경
//     var loginsuccess=false;
//     new Promise((resolve, reject)=>{
//         db.query(`SELECT * FROM users`,(err,result)=>{
//             if(err)throw err;
//             for(var key in result){
//                 if(result[key].tel==req.body.tel && result[key].pw==req.body.pw)loginsuccess=true;
//             }
//             resolve();
//         })
//     }).then(()=>{
//         if(loginsuccess==true){

//             res.cookie("tel",req.body.tel);
//         }
//         next();
//     })

// })

router.post('/', (req, res) => {
    var loginsuccess = false;
    new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            if (err) throw err;
            for (var key of result) {
                console.log(key);
                if (key.tel == req.body.tel && key.pw == req.body.pw) loginsuccess = true;
            }
            resolve();
        })
    }).then(() => {
        res.send({ loginsuccess: loginsuccess })
    }).catch(err => {
        console.log(err);
    });
})