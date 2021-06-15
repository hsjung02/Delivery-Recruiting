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
    var myorderlist=[];
    var orderlist=[];
    var sql=``;
    new Promise((resolve,reject)=>{
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
        }).then(()=>{
            var header=fs.readFileSync("./user_header.html","utf8");
            res.write(header);
            var temp = `<div class='title'>${req.cookies.tel}님</div>`
            temp+=`<div class='title2'>내가 생성한 주문</div>`;
            temp+=`<div class='orderbox'>`;
            myorderlist.forEach((ordername, index, array)=>{
                temp+=`<ul><input type='submit' value='${ordername}' onClick="location.href='/order/${ordername}'"></input></ul>`;
            })
            temp+=`</div>`;
            temp+=`<div class='title2'>내가 신청한 주문</div>`
            temp+=`<div class='orderbox'>`;
            orderlist.forEach((ordername, index, array)=>{
                temp+=`<ul><input type='submit' value='${ordername}' onClick="location.href='/order/${ordername}'"></input></ul>`;
            })
            temp+=`</div>`;
            res.write(temp);
            var footer = fs.readFileSync("./footer.html", "utf8");
            res.write(footer);
            res.end();
        })
    })
})


