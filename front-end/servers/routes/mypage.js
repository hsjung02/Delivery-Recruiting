const express = require('express');
const mysql = require('mysql');
const db = require('../dbconnection.js');
const cookieParser = require('cookie-parser');
const router = express.Router();
module.exports = router;

router.get('/', (req, res) => { //jo
    var allorder;
    var order;
    var ordernum = 0;
    var key;
    var myorderlist = []; //내가 생성한 주문
    var orderlist = []; //내가 신청한 주문
    var sql = ``;
    new Promise((resolve, reject) => { //여기는 백엔드 파트입니다
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`, (err, result) => {
            if (err) throw err;
            allorder = result;
            ordernum = Object.keys(result).length;
            resolve();
        })
    }).then(() => {
        for (key = 0; key < ordernum; key++) {
            sql += `SELECT tel FROM ${allorder[key].TABLE_NAME};`
        }
        new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) throw err;
                for (key = 0; key < ordernum; key++) {
                    order = result[key];
                    for (var k in order) {
                        if (k == 'tel') {
                            if (order[k] == req.cookies.tel) {
                                if (key == 0) myorderlist.push(allorder[key].TABLE_NAME);
                                else orderlist.push(allorder[key].TABLE_NAME);
                                break;
                            }
                        } else {
                            if (order[k].tel == req.cookies.tel) {
                                if (k == 0) myorderlist.push(allorder[key].TABLE_NAME);
                                else orderlist.push(allorder[key].TABLE_NAME);
                                break;
                            }
                        }

                    }
                }
                resolve();
            })
        }).then(() => {
            res.json({ myorderlist: myorderlist, orderlist: orderlist });
        })
    })
})