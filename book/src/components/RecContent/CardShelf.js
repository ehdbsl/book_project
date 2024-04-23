import React, { useState } from 'react';
import './CardShelf.css'; // 컴포넌트별 CSS 파일

function CardShelf() {
    // 카드의 현재 위치(오프셋) 상태를 관리
    const [offset, setOffset] = useState(0);

    // 다음 버튼 클릭 이벤트
    const handleNext = () => {
        // 카드를 왼쪽으로 이동 (다음 카드 보여줌)
        setOffset(currentOffset => currentOffset - 300); // 카드 너비와 마진을 고려하여 조정
    };

    // 이전 버튼 클릭 이벤트
    const handlePrev = () => {
        // 카드를 오른쪽으로 이동 (이전 카드 보여줌)
        setOffset(currentOffset => currentOffset + 300);
    };

    return (
        <div className="card-shelf" style={{ transform: `translateX(${offset}px)`, transition: 'transform 0.3s ease-in-out' }}>
            <div className="card" id="card1">카드 1</div>
            <div className="card" id="card2">카드 2</div>
            <div className="card" id="card3">카드 3</div>
            <div className="card" id="card4">카드 4</div>
            <div className="card" id="card5">카드 5</div>
            <div className="card" id="card6">카드 6</div>
            <div className="card" id="card7">카드 7</div>
            <div className="card" id="card8">카드 8</div>
            <div className="card" id="card9">카드 9</div>
            <div className="card" id="card10">카드 10</div>
            <div className="buttons">
                <button id="prevButton" type="button" onClick={handlePrev}></button>
                <button id="nextButton" type="button" onClick={handleNext}></button>
            </div>
        </div>
    );
}

export default CardShelf;