const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// MySQL 연결 정보 설정
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 호스트명
  user: 'root',      // MySQL 사용자명
  password: 'password',  // MySQL 비밀번호
  database: 'your_database' // 사용할 데이터베이스명
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공! 연결 ID: ' + connection.threadId);
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
  const ssn1 = req.body.ssn1;
  const ssn2 = req.body.ssn2;
  const zipcode = req.body.zipcode;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const address3 = req.body.address3;
  
  // 회원가입 정보를 데이터베이스에 삽입하는 쿼리 작성
  const sql = `INSERT INTO users (userid, userpw, name, hp, email, ssn1, ssn2, zipcode, address1, address2, address3) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  // 쿼리 실행
  connection.query(sql, [userid, userpw, name, hp, email, ssn1, ssn2, zipcode, address1, address2, address3], (err, result) => {
    if (err) {
      console.error('회원가입 오류: ' + err.message);
      res.status(500).send('회원가입에 실패했습니다.');
      return;
    }
    console.log('회원가입 성공!');
    res.status(200).send('회원가입이 완료되었습니다.');
  });
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
