//==============모듈 export============//
const express = require('express');
const db = require('./dbconnection.js');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));
//==============모듈 export 끝========//

//=============라우터 export==========//
const joinRouter = require('./routes/join.js');
app.use('/join',joinRouter);
const loginRouter = require('./routes/login.js');
app.use('/login',loginRouter);
const logoutRouter = require('./routes/logout.js');
app.use('/logout',logoutRouter);
const mypageRouter = require('./routes/mypage.js');
app.use('/mypage',mypageRouter);
const neworderRouter = require('./routes/neworder.js');
app.use('/neworder',neworderRouter);
const orderRouter = require('./routes/order.js');
app.use('/order',orderRouter);
//=============라우터 export 끝========//


app.get('/',(req,res)=>{

    var logined = true;
    if(req.cookies == undefined || Object.keys(req.cookies).length == 0){
        logined = false;
    }
    var order = [];

    new Promise((resolve,reject)=>{
        db.query(`SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA='delivery' AND TABLE_NAME!='users'`,(err,result)=>{
            if(err)throw err;
            for(var key in result){
                order.push(result[key].TABLE_NAME);
            }
            resolve();
        })
    }).then(()=>{
        res.send({logined:logined,order:order});
    })

})

app.listen(port,()=>{console.log(`server running on port ${port}`)});