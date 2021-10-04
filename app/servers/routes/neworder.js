const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.post('/',(req,res)=>{ //생성한 후 /order/ordername 으로 자동 리다이렉트되므로, 프론트 작업 필요없음
    console.log(req.body.tags);
    new Promise((resolve,reject)=>{
        db.query(`CREATE TABLE ${req.body.name} (id int NOT NULL auto_increment primary key, tel VARCHAR(15) NOT NULL, product VARCHAR(30) NOT NULL, price VARCHAR(5) NOT NULL);`,(err,result)=>{
            if(err)res.sendStatus(404);
            resolve();
        })
    }).then(()=>{
        new Promise((resolve,reject)=>{
            db.query(`INSERT INTO ${req.body.name} (tel, product, price) VALUES ('${req.cookies.tel}','','${req.body.totalprice}')`,(err,result)=>{
                if(err)res.sendStatus(404);
                resolve();
            })
        }).then(()=>{
            new Promise((resolve,reject)=>{
                db.query(`INSERT INTO ${req.body.name} (tel, product, price) VALUES ('${req.cookies.tel}','${req.body.product}','${req.body.price}')`,(err,result)=>{
                    if(err)res.sendStatus(404);
                    resolve();
                })
            }).then(()=>{
                addTag(req.body.name, req.body.tags);
                res.end();
            })
        })
    })
})

async function addTag(ordername, tags){
    for(var tag of tags){
        console.log('qweqg');
        let results = await new Promise((resolve, reject) => db.query(`INSERT INTO tag_order (ordername, tag) VALUES ('${ordername}','${tag}')`, (err, results) => {
            console.log(tag);
            if (err) {
              reject(err)
            } else {
              resolve(results);
            }
          }));
        console.log('qweqg');
    }
}