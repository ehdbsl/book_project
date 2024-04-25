import React, { useState, useEffect } from 'react';
import './RecContents.css';
import recimgmain from './rec-img2-1.jpg';
import axios from 'axios';

function RecContents() {
    const recItems = document.querySelectorAll('rec-items');

    const [activeCard, setActiveCard] = useState(1); // 활성화된 카드의 번호 상태

    const handlePageClick = (pageNumber) => {
        setActiveCard(pageNumber); // 클릭된 페이지 번호로 상태 업데이트
    };

    const [topFiveBooks, setTopFiveBooks] = useState([]);

    useEffect(() => {
        const fetchTopFiveBooks = async () => {
          try {
            const response = await axios.get('http://localhost:3005/top5');
            setTopFiveBooks(response.data);
          } catch (error) {
            console.error('Error fetching top five books:', error);
          }
        };
    
        fetchTopFiveBooks();
      }, []);

    
    return (
        <div className="rec-contents">
            <div className="rec-title">
                <p>5월 추천세션 :</p>
                <p>주목할 만한 책들을 만나보세요.</p>
                {/* <img src={recimgmain} id="recimg" alt="Recommendation Session" /> */}
            </div>
            <div className="rec-items">
                {topFiveBooks.map((book, index) => (
                    <div key={index} className={`card ${activeCard === index + 1 ? 'active' : ''}`}>
                        <img src={book.imgElement} alt={book.titleElement} className="book-image" />
                        <div className="book-details">
                            <h2>{book.titleElement}</h2>
                            <p>저자: {book.authorElement}</p>
                            <p>출판: {book.publisherElement}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecContents;