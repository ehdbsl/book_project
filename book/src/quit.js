const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// MySQL 연결 설정

const connection = mysql.createConnection({
    host: '219.250.0.29',
    user: 'kdt1',
    password: '1234',
    port: '413',
    database: 'library'
});

// 회원 탈퇴 API 엔드포인트
app.post('/delete-user', (req, res) => {
    const { userid, userpw } = req.body;

    // 사용자 비밀번호 확인 쿼리
    const checkUserQuery = 'SELECT * FROM user WHERE userid = ? AND userpw = ?';
    connection.query(checkUserQuery, [userid, userpw], (error, results) => {
        if (error) {
            console.error('Error checking user:', error);
            res.status(500).json({ message: 'Internal Server Error' });
            return;
        }

        // 사용자가 존재하지 않는 경우
        if (results.length === 0) {
            res.status(404).json({ message: 'User not found or invalid credentials' });
            return;
        }

        // 회원 탈퇴 쿼리 실행
        const deleteUserQuery = 'DELETE FROM user WHERE userid = ?';
        connection.query(deleteUserQuery, [userid], (error, results) => {
            if (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: 'Internal Server Error' });
                return;
            }

            res.status(200).json({ message: 'User deleted successfully' });
        });
    });
});

// 서버 시작
const port = 3010;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
