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





router.get('/',(req,res)=>{ //로그아웃 버튼을 눌러서 /logout 페이지로 이동했을 때
    try {
        res.clearCookie('tel');   //쿠키 초기화
        res.redirect(302,'/');    //메인 화면으로 리다이렉트
    } catch(err){
        console.log(err);
    }
})









