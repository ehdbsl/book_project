import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBarr.css';
import bookimg from './book_1.png';
import searchbtn from './zoom.png';
import SearchBox from './SearchBox';
// import mobMenu from './mob-menu.png';


function NavBarr() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [search, setSearch] = useState('');
    const [activeMenu, setActiveMenu] = useState('');

    const [mobileVisible, setMobileVisible] = useState(false);  // 모바일환경에서의 메뉴
    const toggleMobileMenu = () => {
        setMobileVisible(!mobileVisible);
        if (setMobileVisible) {
            const menu = document.querySelector('.mobileMenu');
            menu.classList.toggle('active'); // 'active' 클래스를 토글
        }
    };     // mobileVisible 상태를 토글

    function closeMobileMenu() {
        setMobileVisible(false);
        const menu = document.querySelector('.mobileMenu');
        menu.classList.remove('active'); // 'active' 클래스를 제거하여 원래 위치로 이동
    }

    const menuItems = {
        "공지사항": ["보도자료", "이벤트"],
        "도서정보": ["주간베스트100", "전체도서목록"],
        // "도서관정보": ["위치"],
        "마이페이지": ["즐겨찾기 목록", "최근 본 도서 목록"]
    };

    const handleLogin = () => {
        alert(`로그인 시도: ${username}, ${password}`);
    };

    // script 끝------------------------------------------------------------------------------------------------
    
    return (
        <div className="navbar">
            <div className="logo">
                <img src={bookimg} alt="Book Menu" />
            </div>
            <div className="mob-search">
            <input type='text' id="input-search" placeholder='검색어를 입력하세요.'></input>
            <img src={searchbtn} alt="search" id="btn-search" />
            </div>
            <button type="button" id="btn-mob-menu" onClick={toggleMobileMenu} style={{cursor: 'pointer'}}></button>
            <div className="mobileMenu" style={{display: mobileVisible ? 'block' : 'none'}}>
                <button type="button" id="btn-cancel" onClick={closeMobileMenu} style={{right: '0', top: '10px'}}></button>
                <ul>
                    <h2><Link to="/notice">공지사항</Link></h2>
                    <li>보도자료</li>
                    <li>이벤트</li>
                </ul>
                <ul>
                    <h2>도서정보</h2>
                    <li>주간베스트100</li>
                    <li>전체도서목록</li>
                </ul>
                <ul>
                    <h2>마이페이지</h2>
                    <li>즐겨찾기 목록</li>
                    <li>최근 본 도서 목록</li>
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
                {/* 
                <input
                type="text"
                placeholder="검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <img src={searchbtn} id="searchbtn" alt="btnimg" />
                */}

                <input
                type="text" id="userid"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="password" id="userpw"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button class="btn" onClick={handleLogin}>로그인</button>
                <button class="btn">회원가입</button>
            </div>
            <div className="searchBox">
                <SearchBox />
            </div>        
        </div>      
    );
} 

export default NavBarr;