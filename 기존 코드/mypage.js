const express = require('express');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hyunseo02',
    database: 'delivery',
    multipleStatements: true
});
const fs = require('fs');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;


router.get('/',(req,res)=>{
    var allorder;
    var order;
    var ordernum=0;
    var key;
    var myorderlist=[]; //내가 생성한 주문
    var orderlist=[]; //내가 신청한 주문
    var sql=``;
    new Promise((resolve,reject)=>{ //여기는 백엔드 파트입니다
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`,(err,result)=>{
            if(err)throw err;
            allorder=result;
            ordernum=Object.keys(result).length;
            resolve();
        })
    }).then(()=>{
        for(key=0;key<ordernum;key++){
            sql+=`SELECT tel FROM ${allorder[key].TABLE_NAME};`
        }
        new Promise((resolve,reject)=>{
            db.query(sql,(err,result)=>{
                if(err)throw err;
                for(key=0;key<ordernum;key++){
                    order=result[key];
                    for(var k in order){
                        if(k=='tel'){
                            if(order[k]==req.cookies.tel){
                                if(key==0)myorderlist.push(allorder[key].TABLE_NAME);
                                else orderlist.push(allorder[key].TABLE_NAME);
                                break;
                            }
                        }
                        else{
                            if(order[k].tel==req.cookies.tel){
                                if(k==0)myorderlist.push(allorder[key].TABLE_NAME);
                                else orderlist.push(allorder[key].TABLE_NAME);
                                break;
                        }
                        }
                        
                    }
                }
                resolve();
            })
        }).then(()=>{ //여기부터 프론트입니다
            var header=fs.readFileSync("./user_header.html","utf8"); //헤더파일
            res.write(header);
            var temp = `<div class='title'>${req.cookies.tel}님</div>` // '전화번호'님 이 상단에 표시
            temp+=`<div class='title2'>내가 생성한 주문</div>`;
            temp+=`<div class='orderbox'>`;
            myorderlist.forEach((ordername, index, array)=>{ //myorderlist에 있는 주문들을 나열, 클릭하면 해당 주문으로 이동
                temp+=`<ul><input type='submit' value='${ordername}' onClick="location.href='/order/${ordername}'"></input></ul>`;
            })
            temp+=`</div>`;
            temp+=`<div class='title2'>내가 신청한 주문</div>`
            temp+=`<div class='orderbox'>`;
            orderlist.forEach((ordername, index, array)=>{ //orderlist에 있는 주문들을 나열, 클릭하면 해당 주문으로 이동
                temp+=`<ul><input type='submit' value='${ordername}' onClick="location.href='/order/${ordername}'"></input></ul>`;
            })
            temp+=`</div>`;
            res.write(temp);
            var footer = fs.readFileSync("./footer.html", "utf8"); //풋터파일
            res.write(footer);
            res.end();
        })
    })
})


