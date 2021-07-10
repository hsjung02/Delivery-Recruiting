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



router.get('/:ordername',(req,res)=>{ // url이 /order/ordername 으로 넘어왔음
    if(Object.keys(req.cookies).length == 0){ // 로그인 안되어있다면
        res.redirect(302,'/login'); // 로그인 화면으로 리다이렉트
    }
    else{
        header = fs.readFileSync("./user_header.html","utf8"); // 회원 전용 헤더파일
        res.write(header);
        var ordername=req.params.ordername;
        var temp='';
        new Promise((resolve, reject)=>{
            db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
                if(err)throw err;
                temp+=`<div class='title'>${ordername}</div>`;
                var totalprice=0;
                var min_price=result[0].price;
                for(var key in result){ // 현재 채워진 금액
                    if(key!=0)totalprice+=parseInt(result[key].price);
                }
                temp+=`<h3>현재금액:${totalprice}/${min_price}</h3>`;
                temp+=
                `<form method="POST" action="/order/${ordername}">
                    <div class='loginform'>
                        <label><input type="text" placeholder="음식" name = "product"'></label>
                        <label><input type="text" placeholder="금액" name="price"'></label>
                        <input type ="submit" value='신청'/>
                    </div>
                </form>`
                if(result[0].tel == req.cookies.tel){ // 주문 생성자이면 주문 마감 버튼 추가
                    temp+=`<input type='submit' value='주문 마감' onClick="location.href='/order/end/${ordername}'"></input>`;
                }
                res.write(temp);
                resolve();
            })
        }).then(()=>{
            var footer = fs.readFileSync("./footer.html", "utf8"); //풋터파일
            res.write(footer);
            res.end();
        })
    }
})


router.post('/:ordername',(req,res)=>{ //누군가가 주문 신청을 했을 때. 프론트 부분은 없습니다
    var ordername=req.params.ordername;
    db.query(`INSERT INTO ${ordername} (tel,product,price) VALUES ('${req.cookies.tel}', '${req.body.product}','${req.body.price}')`,(err,result)=>{
        if(err)throw err;
        res.redirect(302,'/');
    })
})

router.get('/end/:ordername',(req,res)=>{ //호스트가 주문 마감하면, 신청자들의 정보를 표에 보여줌. 전화번호, 메뉴, 가격을 표로 보여줌
    var ordername = req.params.ordername;
    var header = fs.readFileSync("./user_header.html","utf8");
    var totalprice=0;
    res.write(header);
    new Promise((resolve,reject)=>{
        db.query(`SELECT * FROM ${ordername}`,(err,result)=>{
            if(err)throw err;
            var temp=`<div class='title'>배달팟 모집결과</div>`
            temp+=`<TABLE border = "1" cellpadding = "1"><thead><tr><th>주문번호</th><th>주문자</th><th>주문내역</th><th>금액</th></tr></thead><tbody>`;
            for(var key in result){
                if(key!=0)
                temp+=`<tr><td>${key}</td><td>${result[key].tel}</td><td>${result[key].product}</td><td>${result[key].price}</td></tr>`
                totalprice+=parseInt(result[key].price)
            }
            temp+=`<tr><td>총합</td><td></td><td></td><td>${totalprice-parseInt(result[0].price)}</td></tr>`;
            temp+='</tbody></TABLE>';
            temp+=`<form method="POST" action="/order/end/${ordername}"><input type ="submit" value='주문 완료'/></form>`;
            res.write(temp);
            resolve();
        })
    }).then(()=>{
        var footer = fs.readFileSync("./footer.html", "utf8");
        res.write(footer);
        res.end();
    })
})

router.post('/end/:ordername',(req,res)=>{ // 주문 마감 후 데이터베이스에서 삭제. 프론트 부분 없습니다.
    new Promise((resolve,reject)=>{
        db.query(`DROP TABLE ${req.params.ordername}`,(err,result)=>{
            if(err)throw err;
            resolve();
        })
    }).then(()=>{
        res.redirect(302,'/');
    })
})

