const express = require('express');
const mysql = require('mysql');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: '219.250.0.29',  // MySQL 호스트
    user: 'kdt1',  // MySQL 사용자명
    password: '1234',  // MySQL 비밀번호
    database: 'library'})

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// 책 클릭 시 최근 목록에 추가하는 엔드포인트
app.post('/add-recent-book', (req, res) => {
    const { title, author } = req.body;

    // 최근 목록에 책 추가
    const query = 'INSERT INTO recent_books (title, author) VALUES (?, ?)';
    connection.query(query, [title, author], (error, results) => {
        if (error) {
            console.error('Error adding recent book:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.status(200).send('Book added to recent list');
    });
});

// 최근 목록 조회 엔드포인트
app.get('/recent-books', (req, res) => {
    const query = 'SELECT title, author FROM recent_books ORDER BY viewed_at DESC LIMIT 10';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error retrieving recent books:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});