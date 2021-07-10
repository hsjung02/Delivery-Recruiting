const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.get('/:ordername',(req,res)=>{ // 로그인 여부, 주문명, 채워진 금액, 최소주문금액, 주문 생성자인지 아닌지
    var loginsuccess=1; //1이면 성공, 0이면 실패
    var totalprice=0;
    var min_price=0;
    var host=0; //1이면 호스트, 0이면 게스트
    if(req.cookies==undefined || Object.keys(req.cookies).length == 0){ // 로그인 안되어있다면
        loginsuccess=0;
    }
    else{
        var ordername=req.params.ordername;
        new Promise((resolve, reject)=>{
            db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
                if(err)throw err;
                min_price=result[0].price;
                for(var key in result){ // 현재 채워진 금액
                    if(key!=0)totalprice+=parseInt(result[key].price);
                }

                if(result[0].tel == req.cookies.tel){ // 주문 생성자이면 주문 마감 버튼 추가
                    host=1;
                }
                resolve();
            })
        }).then(()=>{
            res.json({loginsuccess:loginsuccess, totalprice:totalprice, min_price:min_price,host:host});
        })
    }
})


router.post('/:ordername',(req,res)=>{ //프론트 X
    var ordername=req.params.ordername;
    db.query(`INSERT INTO ${ordername} (tel,product,price) VALUES ('${req.cookies.tel}', '${req.body.product}','${req.body.price}')`,(err,result)=>{
        if(err)throw err;
        res.end();
    })
})

router.get('/end/:ordername',(req,res)=>{ // {orders, totalprice} orders는 Array of Objects. Object는 Object.tel, Object.product, Object.price로 참조 가능
    var ordername = req.params.ordername;
    var totalprice=0;
    var orders=[];
    new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
            if(err)throw err;
            for(var key in result){
                if(key!=0){
                    orders.push(result[key]);
                    totalprice+=parseInt(result[key].price);
                }
            }
            resolve();
        })
    }).then(()=>{
        res.json({orders:orders,totalprice:totalprice});
    })
})

router.post('/end/:ordername',(req,res)=>{ //프론트 X
    new Promise((resolve,reject)=>{
        db.query(`DROP TABLE ${req.params.ordername}`,(err,result)=>{
            if(err)throw err;
            resolve();
        })
    }).then(()=>{
        res.end();
    })
})