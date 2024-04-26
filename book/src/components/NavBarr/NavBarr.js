import React, { useState } from 'react';
import './NavBarr.css';
import bookimg from './book_1.png';
import searchbtn from './zoom.png';
// import mobMenu from './mob-menu.png';
import  RegistrationForm from './regist.js';

function NavBarr() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [activeMenu, setActiveMenu] = useState('');

    const [mobileVisible, setMobileVisible] = useState(false);  // 모바일환경에서의 메뉴
    const toggleMobileMenu = () => {
        setMobileVisible(!mobileVisible);
    };     // mobileVisible 상태를 토글

    const menuItems = {
        "공지사항": ["보도자료", "이벤트"],
        "도서정보": ["주간베스트100", "전체도서목록"],
        "도서관정보": ["위치"],
        "마이페이지": ["즐겨찾기 목록", "찜 목록", "최근 본 도서 목록"]
    };
    const handleLogin = () => {
        alert(`로그인 시도: ${username}, ${password}`);
    };
    
    return (
        <div className="navbar">
                <div className="logo">
                <img src={bookimg} alt="Book Menu" />
                </div>
                <div className="mobileMenu" style={{display: mobileVisible ? 'block' : 'none'}}>
                    <img src={bookimg} alt="mobileMenu" onClick={toggleMobileMenu} style={{cursor: 'pointer'}} />
                    <ul>
                        <h3>공지사항</h3>
                        <li>보도자료</li>
                        <li>이벤트</li>
                    </ul>
                </div> 
                {Object.keys(menuItems).map((menu) => (
                    <div 
                    className="menu-item"
                    onMouseOver={() => setActiveMenu(menu)}
                    onMouseLeave={() => setActiveMenu('')}
                    >
                    {menu}
                    {activeMenu === menu && (
                        <div className="submenu">
                        {menuItems[menu].map((subitem) => (
                            <div>{subitem}</div>
                        ))}
                        </div>
                    )}
                    </div>
                ))}

            <div className="login-section">
                <input
                type="text"
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <button class="btn" style={{border: 'none'}}><img src={searchbtn} id="searchbtn" alt="btnimg" /></button>   
                <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button class="btn" onClick={handleLogin}>로그인</button>
                <button class="btn" >회원가입</button>
            </div>        
        </div>      
    );
}

export default NavBarr;