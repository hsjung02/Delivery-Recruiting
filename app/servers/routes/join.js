const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.post('/', (req, res) => {

    var state = req.body.joinstate;

    var check = 1;
    if (state == 0) {
        new Promise((resolve, reject) => {
            db.query(`SELECT tel FROM users`, (err, result) => {
                if (err)res.sendStatus(404);
                for (var key of result) {
                    if (key.tel === req.body.tel) {
                        check = 2;
                    }
                }
                resolve();
            })
        }).then(() => {
            if (check == 1) {
                new Promise((resolve, reject) => {
                    db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`, (err, result) => { // 회원정보 생성
                        if (err)res.sendStatus(404);
                        resolve();
                    })
                }).then(() => {
                    res.json({ state: check });
                })
            } else {
                res.json({ state: check });
            }
        }).catch(err => {
            console.log('error: ');
            console.log(err);
            res.sendStatus(404)
        })
    } else if (state == 3) {
        new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE tel='${req.body.tel}'`, (err, result) => { //데이터베이스에서 삭제 후
                if (err)res.sendStatus(404);
                resolve();
            })
        }).then(() => {
            db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`, (err, result) => { // 회원정보 생성
                if (err)res.sendStatus(404);
                res.json({ state: 3 });
            })
        })
    } else if (state == 4) {
        db.query(`SELECT pw FROM users WHERE tel='${req.body.tel}'`, (err, result) => {
            if (err)res.sendStatus(404);
            res.json({ state: 4, pw: result[0].pw });
        })
    }
})
// const express = require('express');
// const mysql = require('mysql');
// const db = require('../dbconnection.js');
// const cookieParser = require('cookie-parser');
// const router = express.Router();
// module.exports = router;

// router.post('/',(req,res)=>{
//     var check=false;
//     new Promise((resolve, reject)=>{
//         new Promise((resolve, reject)=>{
//                 db.query(`SELECT tel FROM users`,(err,result)=>{
//                     if(err)throw err;
//                     for(var key in result){
//                         if(result[key].tel == req.body.tel){
//                             check=true;
//                         }
//                     }
//                     resolve();
//                 })
//             }).then(()=>{
//                 if(check==true)
//                     db.query(`DELETE FROM users WHERE tel='${req.body.tel}'`,(err,result)=>{ //데이터베이스에서 삭제 후
//                         if(err)throw err;
//                     })
//                 resolve();
//             })
//     }).then(()=>{
//         db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`,(err,result)=>{ // 회원정보 생성
//                 if(err)throw err;
//             })
//             res.json({check:check});

//     })
// })
