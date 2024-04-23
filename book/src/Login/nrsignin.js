const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database(':memory:'); // 메모리에 데이터베이스 생성, 실제 운영에서는 파일에 저장하는 것이 일반적

// 데이터베이스 테이블 생성
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)");
});

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// 비회원 로그인
app.post('/guest-login', (req, res) => {
    // 여기에 비회원 로그인 로직 구현
    // 임시로 사용자를 로그인 시킴
    res.send('Guest login successful');
});



// 서버 시작
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});