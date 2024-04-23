import React from 'react';
import './Footer.css'; // 컴포넌트별 CSS 파일

function Footer() {
    return (
        <footer className="footer">
            <div className='menuAll'>
                <div className="weblogo"></div>
                <div className="notice">
                    <h4>공지사항</h4>
                    <li>보도자료</li>
                    <li>이벤트</li>
                </div>
                <div className="bookinfo">
                    <h4>도서정보</h4>
                    <li>주간베스트100</li>
                    <li>전체도서목록</li>
                </div>
                <div className="libraryinfo">
                    <h4>도서관정보</h4>
                    <li>도서관찾기</li>
                </div>
                <div className="mypage">
                    <h4>마이페이지</h4>
                    <li>즐겨찾기목록</li>
                    <li>최근 본 도서 목록</li>
                </div>
            </div>
            <p>2024 copyright alrights reserved.</p>
        </footer>
    );
}

export default Footer;