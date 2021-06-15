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


// router.use('/',(req,res,next)=>{
//     res.clearCookie('tel');
//     next();
// })


router.get('/',(req,res)=>{
    try {
        res.clearCookie('tel');   
        res.redirect(302,'/');
    } catch(err){
        console.log(err);
    }
})



//1. 쿠키 만료 시간을 설정해서 없애기
//2. cookie parser 이용






