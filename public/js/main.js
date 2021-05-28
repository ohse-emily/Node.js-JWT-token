document.addEventListener('DOMContentLoaded',init); // 딱 한번 최초 실행
function init(){
    const loginBtn = document.querySelector('#loginBtn');
    const layerPopup=document.querySelector('.layerPopup');
    const localLogin=document.querySelector('#localLogin');
    loginBtn.addEventListener('click',loginBtnFn)    
    layerPopup.addEventListener('click', layerPopupClose);
    localLogin.addEventListener('click',localLoginFn);
}

function loginBtnFn(){
    const layerPopup =document.querySelector('.layerPopup');
   // layerPopup.setAttribute('class', 'layerPopup open');
    layerPopup.classList.add('open'); //오우 
}
function layerPopupClose(event){
    if(event.target==this){
        this.classList.remove('open');
    }
}
async function localLoginFn(){
    const userid = document.querySelector('#userid');
    const userpw = document.querySelector('#userpw');

    if(userid.value==""){
        alert('아이디를 입력해 주세요');
        userid.focus();
        return 0;  // return을 끝낸다는 의미 
        //return 안쓰면 if 절 밖에 fetch가 실행될거야 
        
    } 
    if(userpw.value==""){
        alert('패스워드를 입력해주세요.');
        userpw.focus();
        return 0;
    }
    
    //POST auth/local/login
    let url = `http://localhost:3000/auth/local/login`;
    let options={
        method:'POST',
        headers:{
            'content-type':`application/json`,
        },
        body:JSON.stringify({
            userid:userid.value,
            userpw:userpw.value,
        })
    }

    let response = await fetch(url,options);
    let res_result = await response.json(); //body내용 가져오기 promise객체 떨어지게
    console.log(res_result)
    //res_result 안에 result, msg 라는 속성이 있음 
    let {result,msg} = res_result;
    alert(msg);
    if(result){
        //로그인 성공 
        let layerPopup = document.querySelector('.layerPopup');
        layerPopup.classList.remove('open');
    }else{
        userid.value=='';
        userpw.value=='';
        userid.focus();
    }
}
