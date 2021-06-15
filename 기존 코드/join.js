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
    res.sendFile(__dirname+'/join.html');
})

router.post('/',(req,res)=>{
    var check=0;
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
                    db.query(`DELETE FROM users WHERE tel='${req.body.tel}'`,(err,result)=>{
                        if(err)throw err;
                    })
                resolve();
            })
    }).then(()=>{
        db.query(`INSERT INTO users (tel, pw) VALUES ('${req.body.tel}','${req.body.pw}')`,(err,result)=>{
                if(err)throw err;
            })
    })
    res.redirect(302,'/');
})

