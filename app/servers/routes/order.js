const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.get('/:ordername',(req,res)=>{ // 주문명, 채워진 금액, 최소주문금액, 주문 생성자인지 아닌지
    var totalprice=0;
    var min_price=0;
    var host=False; //True이면 호스트, False이면 게스트
    
    var ordername=req.params.ordername;
    new Promise((resolve, reject)=>{
        db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
            if(err)res.sendStatus(404);
            min_price=result[0].price;
            for(var key in result){ // 현재 채워진 금액
                if(key!=0)totalprice+=parseInt(result[key].price);
            }
            if(result[0].tel == req.cookies.tel){ // 주문 생성자이면 주문 마감 버튼 추가
                host=True;
            }
            resolve();
        })
    }).then(()=>{
            res.json({totalprice:totalprice, min_price:min_price,host:host});
        })
})


router.put('/:ordername',(req,res)=>{ //프론트 X
    var ordername=req.params.ordername;
    db.query(`INSERT INTO ${ordername} (tel,product,price) VALUES ('${req.cookies.tel}', '${req.body.product}','${req.body.price}')`,(err,result)=>{
        if(err)res.sendStatus(404);
        res.end();
    })
})

router.get('/end/:ordername',(req,res)=>{ // {orders, totalprice} orders는 Array of Objects. Object는 Object.tel, Object.product, Object.price로 참조 가능
    var ordername = req.params.ordername;
    var totalprice=0;
    var orders=[];
    new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
            if(err)res.sendStatus(404);
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

router.delete('/end/:ordername',(req,res)=>{ //프론트 X
    new Promise((resolve,reject)=>{
        db.query(`DROP TABLE ${req.params.ordername}`,(err,result)=>{
            if(err)res.sendStatus(404);
            resolve();
        })
    }).then(()=>{
        res.end();
    })
})