import React from 'react';
import CardShelf from './CardShelf'; // CardShelf 컴포넌트를 임포트
import './RecContent.css'; // RecContent 전용 CSS

function RecContent() {
    return (
        <div className="rec-content">
            <div className="rec-title">
                <p>5월 추천 세션</p>
                <p>주목할 만한 책들을 만나보세요.</p>
            </div>
            <CardShelf />
        </div>
    );
}

export default RecContent;