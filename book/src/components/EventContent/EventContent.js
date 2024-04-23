import React, { useState, useEffect } from 'react';
import './EventContent.css'; // 컴포넌트별 CSS 파일
import mainimg from './event1-1.jpg';
import mainimg2 from './event2-1.jpg';
import mainimg3 from './event4-1.jpg';

function EventContent() {
    // 이미지들을 배열로 관리합니다. 이 배열은 실제 이미지 경로를 포함해야 합니다.
    const images = [mainimg, mainimg2, mainimg3];

    // 현재 선택된 이미지의 인덱스를 상태로 관리합니다. 초기 값은 0 (첫 번째 이미지).
    const [currentImage, setCurrentImage] = useState(0);
    const [animate, setAnimate] = useState(false);

    const handleImageChange = (index) => {
        if (index !== currentImage) { // 새로운 이미지가 선택된 경우에만 애니메이션
            setAnimate(true);
            setCurrentImage(index);
        }
    };

    useEffect(() => {
        if (animate) {
            const timeout = setTimeout(() => setAnimate(false), 500); // 애니메이션 시간 후에 애니메이션 클래스 제거
            return () => clearTimeout(timeout);
        }
    }, [animate]);

    return (
        <div className="event-content">
            <div className="event">
                <p>한 눈에 보는, </p>
                <p>5월의 이벤트</p>
                <div id="main-img" className={animate ? "slide" : ""}>
                <img src={images[currentImage]} alt="Main Event" className="active" />
                </div>

                {/* <div id="main-img">
                    <img src={mainimg2} alt="Main Event" />
                </div>
                <div id="main-img">
                    <img src={mainimg3} alt="Main Event" />
                </div> */}
            </div>
            <div className="eventPage">
            <div id="pages">
                    {/* 숫자 버튼을 렌더링하고 클릭 시 handleImageChange를 호출합니다. */}
                    {images.map((_, index) => (
                        <button key={index} onClick={() => handleImageChange(index)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventContent;