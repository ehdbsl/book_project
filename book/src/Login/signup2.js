const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();


// MySQL 연결 정보 설정
const connection = mysql.createConnection({
    host: 'localhost', // MySQL 호스트명
    user: 'root',      // MySQL 사용자명
    password: '1234',  // MySQL 비밀번호
    database: 'library' // 사용할 데이터베이스명
  });
  
// MySQL 연결
connection.connect((err) => {
    if (err) {
      console.error('MySQL 연결 오류: ' + err.stack);
      return;
    }
    console.log('MySQL 연결 성공! 연결 ID: ' + connection.threadId);
});
  
// 서버 시작
const port = process.env.PORT || 3306;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});


// Body-parser 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
  
// 회원가입 POST 라우트
app.post('/regist', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const hp = req.body.hp;
    const email = req.body.email;
    const gender = req.body.gender;
    const ssn1 = req.body.ssn1;
    const ssn2 = req.body.ssn2;
    const zipcode = req.body.zipcode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    // const address3 = req.body.address3;
    
    // 회원가입 정보를 데이터베이스에 삽입하는 쿼리 작성
    const sql = `INSERT INTO user (userid, name, userpw, hp, email, gender, ssn1, ssn2, zipcode, address1, address2) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // gender 변수 추가하기
    connection.query(sql, [userid, name, userpw, hp, email, gender, ssn1, ssn2, zipcode, address1, address2], (err, result) => {
        if (err) {
            console.error('회원가입 오류: ' + err.message);
            res.status(500).send('회원가입에 실패했습니다.');
            return;
        }
        console.log('회원가입 성공!');
        res.status(200).send('회원가입이 완료되었습니다.');
    });
});


window.onload = function(){
    const ssn1 = document.getElementById('ssn1');
    ssn1.addEventListener('keyup', () => {
        if(ssn1.value.length >= 6){
            document.getElementById('ssn2').focus();
        };
    });

    const ssn = document.querySelectorAll('.ssn');
    ssn.forEach((s) => {
        // console.log(s);
        s.addEventListener('input', () => {
            document.getElementById('ssncheck').value = 'n';
        });
    });
};




// 주민등록번호 검증함수
function checkSSN(){    
    const ssn1 = document.getElementById('ssn1');
    const ssn2 = document.getElementById('ssn2');

    const ssn = ssn1.value + ssn2.value;
    const key = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];

    let total = 0;

    for (let i=0; i<key.length; i++){
        total += parseInt(ssn[i]) * key[i];
    };

    let result = total % 11;
    result = 11 - result;
    if(result >= 10) result = result % 10;

    if(result == ssn[12]){
        alert('유효한 주민등록번호입니다!');
        document.getElementById('ssncheck').value = 'y';
    }else{
        alert('유효하지 않은 주민등록번호입니다')
    };
}


// 회원가입 양식 확인
function sendit(){
    const userid = document.getElementById('userid');
    const userpw = document.getElementById('userpw');
    const userpw_re = document.getElementById('userpw_re');
    const name = document.getElementById('name');
    const hp = document.getElementById('hp');
    const email = document.getElementById('email');
    const ssncheck = document.getElementById('ssncheck');
    const checkbtn = document.getElementById('checkbtn');
    const expIdText = /^[A-za-z0-9]{4,20}$/;
    const expPwText = /^(?=.*[A-Za-z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{4,20}$/;
    const expNameText = /^[가-힣]+$/;
    const expHpText = /^\d{3}\d{3,4}\d{4}$/;
    const expEmailText = /^[A-Za-z0-9\-\.\_]+@[A-Za-z0-9\-]+\.[A-Za-z]+$/;

    if(!expIdText.test(userid.value)){
        alert('아이디는 4자이상 20자이하의 영문자, 숫자로 입력하세요');
        userid.focus();
        return false;
    };

    if(!expPwText.test(userpw.value)){
        alert('비밀번호는 4자이상 20자이하의 영문자, 숫자, 특수문자를 1자 이상 꼭 포함해야합니다');
        userpw.focus();
        return false;
    };

    if(userpw.value != userpw_re.value){
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
        userpw_re.focus();
        return false;
    };

    if(!expNameText.test(name.value)){
        alert('이름은 한글로 입력하세요');
        name.focus();
        return false;
    };

    if(!expHpText.test(hp.value)){
        alert('휴대폰번호 형식이 일치하지 않습니다');
        hp.focus();
        return false;
    };

    if(!expEmailText.test(email.value)){
        alert('이메일 형식이 일치하지 않습니다');
        email.focus();
        return false;
    };

    if(ssncheck.value == 'n'){
        alert('주민등록번호 유효성검사를 해주세요');
        checkbtn.focus();
        return false;
    };

    return true;
};
