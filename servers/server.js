//====================모듈 export==================//
const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hyunseo02',
    database: 'delivery'
});
const app = express();
const port =process.env.PORT || 8080;

app.use(express.json());
const cookieParser = require('cookie-parser'); //로그인 기능을 위한 cookieParser 라이브러리
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
const logoutRouter = require('./routes/logout.js'); //logout 라우터
app.use('/out',logoutRouter); // url이 /out으로 끝나면 로그아웃 페이지로 이동
const loginRouter = require('./routes/login.js');  //login 라우터
app.use('/login',loginRouter); // url이 /login으로 끝나면 로그인 페이지로 이동
const joinRouter = require('./routes/join.js'); //join 라우터
app.use('/join',joinRouter); // url이 /join으로 끝나면 회원가입 페이지로 이동
const orderRouter = require('./routes/order.js'); //order 라우터
app.use('/order',orderRouter); // url이 /order로 끝나면 주문 페이지로 이동(다른 사람이 만든 주문에 내 주문 추가)
const neworderRouter = require('./routes/neworder.js'); //neworder 라우터
app.use('/neworder',neworderRouter); // url이 /neworder로 끝나면 주문 페이지로 이동(새로운 주문 생성)
const mypageRouter = require('./routes/mypage.js'); //mypage 라우터
app.use('/mypage',mypageRouter); // url이 /mypage로 끝나면 마이페이지로 이동
//====================모듈 export 끝==============//


app.get('/', (req, res)=>{
    var logined = true;
    console.log('hi');
    if(req.cookies==undefined || Object.keys(req.cookies).length == 0){
        logined=false;
    }
    var order=[];
    new Promise((resolve,reject)=>{
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`,(err,result)=>{
            if(err)throw(err);
            for(var key in result){
                console.log(result[key].TABLE_NAME);
                order.push(result[key].TABLE_NAME);
            }
            resolve();
        })
    }).then(()=>{
        res.send({logined:true,order:order});
    })
});



app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
})