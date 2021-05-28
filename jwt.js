require('dotenv').config();
const crypto = require('crypto');
const { create } = require('domain');


//JWT 토큰 header.payload.signature
function createToken(userid){
    let header = {
        "tpy":"JWT",
        "alg":"HS256",
    }
    //현재시간으로부터 미래시간 : 2시간을 더한 수  
    //두시간 뒤 재로그인 - 길면 길수록 해킹 위험 up 
    let exp = new Date().getTime() + ((60*60*2) *1000) //1970.1.1부터 0 // 1월1일 1초지났으면 1000 
    
    let payload = {  //인자로 들어온 애 
        userid,
        //expiary date
        exp,
    }
    ///Buffer.from - 바이너리 파일 만들기
    const encodingHeader = Buffer.from(JSON.stringify(header)).toString('base64').replace('=','').replace('==','');
    const encodingPayload = Buffer.from(JSON.stringify(payload)).toString('base64').replace('==','').replace('=','');
    //console.log(encodingHeader, encodingPayload);

    //암호화 시작 
    //첫번째 : 암호방식 /두번째인자 : key값 (이게 공개되면 해킹됨) - best-env
    let signature = crypto.createHmac('sha256',Buffer.from(process.env.salt)).update(encodingHeader+"."+encodingPayload).digest('base64').replace('=','').replace('==','');
    
    let jwt = `${encodingHeader}.${encodingPayload}.${signature}`
    
    return jwt;
}

let token = createToken('root');
console.log(token)

//userid 값만 넣어줄 예정
//module.exports=(userid)=>{    }  아래와 같은 뜻 
module.exports = createToken;
