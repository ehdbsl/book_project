import React, { useState, useEffect } from 'react';
import './RecContents.css';
import axios from 'axios';

function RecContents() {
    // const recItems = document.querySelectorAll('rec-items');

    const [activeCard, setActiveCard] = useState(1); // 활성화된 카드의 번호 상태
    const [topFiveBooks, setTopFiveBooks] = useState([]);
    const [cardsToShow, setCardsToShow] = useState(3);

    useEffect(() => {
        const fetchTopFiveBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3005/top5');
            const books = setTopFiveBooks(response.data);

                // 중복 데이터 제거, 책의 고유 식별자(ID, ISBN 등)를 기준으로
                const uniqueBooks = books.filter((book, index, self) =>
                    index === self.findIndex((t) => (
                        t.id === book.id
                    ))
                );
                setTopFiveBooks(uniqueBooks);
            }
        catch (error) {
            console.error('Error fetching top five books:', error);
        }   
        
        };
    
        fetchTopFiveBooks();

        const handleResize = () => {
            setCardsToShow(window.innerWidth < 735 ? 2 : 3); // 화면 너비가 735px 이하면 2장, 그렇지 않으면 3장
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // 컴포넌트 마운트 시 초기 실행

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const handlePrev = () => {
        setActiveCard(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setActiveCard(prev => Math.min(topFiveBooks.length - 3, prev + 1));
    };

    
    return (
        <div className="rec-contents">
            <div className="rec-title">
                <p>5월 추천세션 :</p>
                <p>주목할 만한 책들을 만나보세요.</p>
            </div>
            <div className="rec-items">
                {topFiveBooks.slice(activeCard, activeCard + cardsToShow).map((book, index) => (
                    <div key={book.id} className="card">
                        <img src={book.imgElement} alt={book.titleElement} className="book-image" />
                        <div className="book-details">
                            <h2>{book.titleElement}</h2>
                            <p>저자: {book.authorElement}</p>
                            <p>출판: {book.publisherElement}</p>
                        </div>
                    </div>
                ))}
                <button className="btnPrev" onClick={handlePrev}></button>
                <button className="btnNext" onClick={handleNext}></button>
            </div>
        </div>
    );
}

export default RecContents;