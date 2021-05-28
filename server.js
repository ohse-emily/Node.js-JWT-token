const express=require('express');
const cookieParser=require('cookie-parser');
const nunjucks=require('nunjucks');
const bodyParser = require('body-parser');
const tokenKey=require('./jwt')
const auth = require('./middleware/auth')
const app = express();

nunjucks.configure('views',{
    express:app,
})
app.set('view engine', 'html');
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false,}));
app.use(cookieParser());

app.get('/user/info',auth, (req,res)=>{
    res.send(`user info입니다 hello ${req.userid}`)
})

app.get('/', (req,res)=>{
    res.render('index.html')
})

app.post('/auth/local/login',(req,res)=>{
    let {userid,userpw} = req.body;
    console.log('body req: ',userid,userpw);
    //원래는 DB접속 후 결과 return 
    let result={};
    if(userid=="asdf"&&userpw=="asdf"){
        result = {
            result:true,
            msg:'로그인에 성공햇습니다.'
        }
        //여기에 token 을 생성해주면 됨 
        let token = tokenKey(userid)
        res.cookie('accessToken',token,{httpOnly:true,secure:true,});


    }else{
        result={
            result:false,
            msg:'아이디와 패스워드를 확인해주세요'
        }
    }
    res.json(result);
})


app.get('/login',(req,res)=>{
    let {id,pw} = req.query;
    if(id=='root' && pw=='root'){
        res.cookie('token',tokenKey, {httpOnly:true,secure:true});
        res.redirect('/?msg=로그인성공');
    }else{
        res.redirect('/?msg=id와 pw가 일치하지 않습니다.');
    }
})

app.get('/menu1',(req,res)=>{
    console.log(req.cookies);
    res.send('menu1페이지입니다');
})

app.listen(3000,()=>{
    console.log('start port : 3000');
})