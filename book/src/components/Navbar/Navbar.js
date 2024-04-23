import React, { useState } from 'react';
import './Navbar.css';
import bookimg from './book_1.png'

function Navbar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    return (
        <nav className="navbar">
            <ul>
                <div className="main-menu" onMouseEnter={() => setDropdownVisible(true)} onMouseLeave={() => setDropdownVisible(false)}>
                    <li className="menu" id="book-img"><img src={bookimg} alt="Book Menu"/></li>
                    <li className="menu">공지사항</li>
                    <li className="menu">도서정보</li>
                    <li className="menu">도서관정보</li>
                    <li className="menu">마이페이지</li>
                    {dropdownVisible && (
                        <div className="dropdown-content">
                            <a href="#">하위 메뉴 1-1</a>
                            <a href="#">하위 메뉴 1-2</a>
                            <a href="#">하위 메뉴 2-1</a>
                            <a href="#">하위 메뉴 2-2</a>
                            <a href="#">하위 메뉴 3-1</a>
                            <a href="#">하위 메뉴 3-2</a>
                        </div>
                    )}
                    <li className="menu" id="login">
                        아이디 : <input type="text" className="input" id="userid"/>
                        비밀번호 : <input type="password" className="input" id="userpw"/>
                    <li className="menu">
                        <button className="btn">로그인</button>
                    </li>
                    <li className="menu" style={{ marginRight: 0 }}>
                        <button className="btn">회원가입</button>
                    </li>
                    </li>                    
                </div>
            </ul>
        </nav>
    );
}

export default Navbar;