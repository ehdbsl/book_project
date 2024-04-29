const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;
const dbconfig = require('./config/dbconfig.json')
const static = require('serve-static');

// Database connction pool
const pool = mysql.createPool({
    connectionLimit: 10, 
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false
});

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/views', static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// 로그인 페이지
app.get('/', (req, res) => {
  res.render('login');
});

// 로그인 로직
app.post('/login', (req, res) => {
    const { userid, userpw } = req.body;
    pool.getConnection((err, conn) => {
        if (err) throw err;  // 데이터베이스 연결 실패 시 오류 처리

        const query = 'SELECT * FROM user WHERE userid = ? AND userpw = ?';
        conn.query(query, [userid, userpw], (error, results) => {
            conn.release();  // 연결 해제
            if (error) throw error;  // 쿼리 실행 실패 시 오류 처리

            if (results.length > 0) {
                res.send('로그인 성공!');  // 로그인 성공 메시지 전송
            } else {
                res.send('<script>alert("아이디와 비밀번호가 일치하지 않습니다!"); window.location="/"; </script>');
            }
        });
    });
});

// 비회원 로그인 페이지
app.get('/unuser-login', (req, res) => {
    res.render('unuserLogin');
  });
  
  // 비회원 로그인 로직
  app.post('/unuser-login', (req, res) => {
      const { hp, un_name, userpw } = req.body;
      pool.getConnection((err, conn) => {
          if (err) throw err;  // 데이터베이스 연결 실패 시 오류 처리
  
          const query = 'SELECT * FROM unuser WHERE hp = ?, un_name = ? AND userpw = ?';
          conn.query(query, [hp, un_name, userpw], (error, results) => {
              conn.release();  // 연결 해제
              if (error) throw error;  // 쿼리 실행 실패 시 오류 처리
  
              if (results.length > 0) {
                  res.send('로그인 성공!');  // 로그인 성공 메시지 전송
              } else {
                  res.send('<script>alert("아이디와 비밀번호가 일치하지 않습니다!"); window.location="/"; </script>');
              }
          });
      });
  });


// 회원가입 페이지 라우트
app.get('/register', (req, res) => {
    res.render('register');
});  

// 회원가입 로직
app.post('/process/register', (req, res) => {
    console.log('/process/register 호출됨 '+req)

    const paramId = req.body.userid;
    const paramName = req.body.name;
    const paramPw = req.body.userpw;
    const paramHp = req.body.hp;
    const paramEmail = req.body.email;
    const paramGender = req.body.gender;
    const paramSsn1 = req.body.ssn1;
    const paramSsn2 = req.body.ssn2;
    const paramZipcode = req.body.zipcode;
    const paramAdd1 = req.body.address1;
    const paramAdd2 = req.body.address2;

    pool.getConnection((err, conn) => {
        if (err) {     
            conn.release();
            console.log('Mysql getConnection error. aborted');            
            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
            res.write('<h1>DB서버 연결 실패</h1>')
            res.end();      
            return;               
        }

        console.log('데이터베이스 연결 됨!!ㅎㅎ');

        const exec = conn.query('insert into user(userid, name, userpw, hp, email, gender, ssn1, ssn2, zipcode, address1, address2) values (?,?,?,?,?,?,?,?,?,?,?);',
                    [paramId, paramName, paramPw, paramHp, paramEmail, paramGender, paramSsn1, paramSsn2, paramZipcode, paramAdd1, paramAdd2],
                    (err, result)=>{
                        conn.release();
                        console.log('실행된 SQL: '+exec.sql)
                        
                        if (err) {
                            console.log('SQL 실행시 오류 발생')
                            console.dir(err);                            
                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h1>SQL query 실행 실패</h1>')
                            res.end();         
                            return                   
                        }

                        if (result) {
                            console.dir(result)
                            console.log('inserted 성공')

                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h2>사용자 추가 성공</h2>')
                            res.end();
                        }
                        else {
                            console.log('Inserted 실패')

                            res.writeHead('200', {'Content-Type': 'text/html; charset=utf8'})
                            res.write('<h1>사용자 추가 실패</h1>')
                            res.end();
                        }
                    }
        )
    })
});

// 아이디 찾기 페이지 요청 처리 라우트
app.get('/find-id', (req, res) => {    
    res.render('findID');
});

// 아이디 찾기 요청 처리
app.post('/find-id', (req, res) => {
    const { name, hp, userpw } = req.body;
    pool.getConnection((err, conn) => {
        if (err) throw err;  // 데이터베이스 연결 실패 시 오류 처리
        
        const sql = 'SELECT userid FROM user WHERE name = ? AND hp = ? AND userpw = ?';
        conn.query(sql, [name, hp, userpw], (error, results) => {
            conn.release();  // 연결 해제
            if (error) throw error;  // 쿼리 실행 실패 시 오류 처리

            if (results.length > 0) {
                const userid = results[0].userid;
                res.send(`당신의 ID는 ${userid}입니다.`);
            } else {
                res.send('<script>alert("입력하신 정보와 일치하는 아이디가 없습니다."); window.location="/find-id"; </script>');
            }
        });
    });
});

// 비밀번호 찾기 페이지
app.get('/find-password', (req, res) => {
  res.render('findPassword');
});

// 비밀번호 변경 요청 처리
app.post('/reset-password', (req, res) => {
    const { userid, name, hp, newPassword, confirmPassword } = req.body;
    
    if (newPassword !== confirmPassword) {
        return res.send('비밀번호가 일치하지 않습니다.');
    }
    
    pool.getConnection((err, conn) => {
        if (err) throw err;
        
        const sql = 'UPDATE user SET userpw = ? WHERE userid = ? AND name = ? AND hp = ?';
        conn.query(sql, [newPassword, userid, name, hp], (error, results) => {
            conn.release();
            
            if (error) throw error;
            
            if (results.affectedRows === 0) {
                return res.send('사용자 정보가 일치하지 않습니다.');
            }
            
            res.send('<script>alert("비밀번호 변경 성공!"); window.location.href = "/";</script>');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });