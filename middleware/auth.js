require('dotenv').config();
const crypto = require('crypto');
const tokenKey = require('../jwt');

module.exports = (req, res, next) => {
    let {accessToken} = req.cookies; //client의 cookie.accesstoken값
    if(accessToken==undefined){
        res.redirect('/?msg=로그인을 해줍쇼');
        return 0; 
    }

    let [header, payload, sign] = accessToken.split('.');
    let signature = getSignature(header, payload);
    console.log(signature)

    if (sign == signature) {
        console.log('검증된 토큰입니다.');
        let { userid, exp } = JSON.parse(Buffer.from(payload, 'base64').toString());
        console.log(userid, exp)
        //시간 넘었는지 쳌 
        let newExp = new Date().getTime();
        if (newExp > exp) {
            res.clearCookie('accessToken');
            res.redirect('/?msg=토큰만료요')
        }
        //모든 검증이 완료됨  -  이제 userid를 사용해도 된다 . 
        // 이쪽에서 db 접속해서 처리 
        req.userid=userid;
        next();
    } else {
        res.redirect('/?msg=해킹이요');
    }
}


function getSignature(header, payload) {
    const signature = crypto.createHmac('sha256', Buffer.from(process.env.salt)).update(header + "." + payload).digest('base64').replace('=', '').replace('==', '');
    return signature;
}