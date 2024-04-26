import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BestSellerList() {
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
        <div>
            {topFiveBooks.map((book, index) => ( // books 배열을 map으로 순회하며 각 책의 정보를 표시
                <div key={index} className="book">
                    <img src={book.imgElement} alt={book.titleElement} />
                    <div className="book-details">
                        <h2>{book.titleElement}</h2>
                        <p>저자: {book.authorElement}</p>
                        <p>출판: {book.publisherElement}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BestSellerList;