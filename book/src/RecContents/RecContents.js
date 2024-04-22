import React, {useState} from 'react';
import './RecContents.css';
import recimgmain from './rec-img2-1.jpg';

function RecContents() {
    const recItems = document.querySelectorAll('rec-items');

    const [activeCard, setActiveCard] = useState(1); // 활성화된 카드의 번호 상태

    const handlePageClick = (pageNumber) => {
        setActiveCard(pageNumber); // 클릭된 페이지 번호로 상태 업데이트
    };
    return (
        <div className="rec-contents">
            <div className="rec-title">
                <p>5월 추천세션 : </p>
                <p>주목할 만한 책들을 만나보세요.</p>
                <img src={recimgmain} id="recimg" alt="recmain" />
            </div>
            <div className="rec-items">
                <div className={`rec-item-1 ${activeCard === 1 ? 'active' : ''}`}>
                    <div className="card" id="card1">카드 1</div>
                    <div className="cardinfo">
                        <h2>줄거리 :</h2>
                        <p>“어떠한 기분으로 사람과 세상을 대하고 있나요? 결국 좋은 기분은 나를 갈고닦는 일입니다” 생각과 태도로 아이스크림을 빚는 가게 〈녹기 전에〉 이야기 일과 삶의 기본이 되는 ‘좋은 기분’에 대하여 매일 다른 메뉴를 선보이고, 손님들과 수상한 대회도 열고, 팝업은 물론 굿즈까지 만드는 등 아이스크림이 주인공인 커뮤니티처럼 운영되는 가게가 있다. 마포구 염리동에 위치한 작은 아이스크림 가게 〈녹기 전에〉 이야기다.</p>

                    </div>
                </div>
    {/* ----------------------------------------------------------------------------------------------------- */}
                <div className="rec-item-2">
                    <div className="card" id="card1">카드 2</div>
                    <div className="cardinfo">
                        <h2>줄거리 :</h2>
                        <p>“어떠한 주인공인 커뮤니티처럼 운영되는 가게가 있다. 마포구 염리동에 위치한 작은 아이스크림 가게 〈녹기 전에〉 이야기다.</p>

                    </div>
                </div>
                <div className="rec-item-2">
                    <div className="card" id="card1">카드 2</div>
                    <div className="cardinfo">
                        <h2>줄거리 :</h2>
                        <p>“어떠한 주인공인 커뮤니티처럼 운영되는 가게가 있다. 마포구 염리동에 위치한 작은 아이스크림 가게 〈녹기 전에〉 이야기다.</p>

                    </div>
                </div>
                <div className="pages">
                
                </div>                    
            </div>
        </div>

    );
}

export default RecContents;