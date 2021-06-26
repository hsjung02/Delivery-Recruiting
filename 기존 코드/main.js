//====================모듈 export==================//
const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({ //데이터베이스 연결
    host: 'localhost',
    user: 'root',
    password: 'hyunseo02',
    database: 'delivery',
    multipleStatements: true
});
const fs = require('fs'); //fs: file system
const cookieParser = require('cookie-parser'); //로그인 기능을 위한 cookieParser 라이브러리
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('public'));
const logoutRouter = require('./logout.js'); //logout 라우터
app.use('/out',logoutRouter); // url이 /out으로 끝나면 로그아웃 페이지로 이동
const loginRouter = require('./login.js');  //login 라우터
app.use('/login',loginRouter); // url이 /login으로 끝나면 로그인 페이지로 이동
const joinRouter = require('./join.js'); //join 라우터
app.use('/join',joinRouter); // url이 /join으로 끝나면 회원가입 페이지로 이동
const orderRouter = require('./order.js'); //order 라우터
app.use('/order',orderRouter); // url이 /order로 끝나면 주문 페이지로 이동(다른 사람이 만든 주문에 내 주문 추가)
const neworderRouter = require('./neworder.js'); //neworder 라우터
app.use('/neworder',neworderRouter); // url이 /neworder로 끝나면 주문 페이지로 이동(새로운 주문 생성)
const mypageRouter = require('./mypage.js'); //mypage 라우터
app.use('/page',mypageRouter); // url이 /mypage로 끝나면 마이페이지로 이동
//====================모듈 export 끝==============//


app.get('/',(req,res)=>{ // 메인 화면입니다
    var header;
    if(Object.keys(req.cookies).length != 0){ // 로그인 되어있다면
        header = fs.readFileSync("./user_header.html","utf8"); // 회원 전용 헤더파일
        res.write(header);
    }
    else{ //로그인 안돼있다면
        header = fs.readFileSync("./not_header.html","utf8"); // 비회원 전영 헤더파일
        res.write(header);
    }
    new Promise((resolve, reject)=>{
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`, (err, result)=>{ //데이터베이스로부터 모든 주문을 가져온 후 나열해줌
            if(err) throw err;
            var temp=`<div class='title'>주문 목록</div>`;
            temp+=`<div class='orderbox'>`;
            for(var key in result){
                temp+=`<ul><input type='submit' value='${result[key].TABLE_NAME}' onClick="location.href='/order/${result[key].TABLE_NAME}'"></input></ul>` // 각 주문 버튼을 클릭하면 /order/주문명 페이지로 이동합니다
            }
            temp+='</div>';
            res.write(temp);
            resolve();
        })
    }).then(()=>{
        var footer = fs.readFileSync("./footer.html", "utf8"); //풋터 파일
        res.write(footer);
        res.end();
    })
})

app.listen(8080,()=>console.log('server running on port 8080')) // 로컬 환경에서는 8080포트에서 호스팅