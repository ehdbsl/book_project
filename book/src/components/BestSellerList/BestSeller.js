import React, { useState, useEffect } from 'react';
// import {scrapeBookData} from './test1.js';

function BestSellerList() {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        // async function fetchData() {
        //     // const results = await scrapeBookData();
        //     setBooks(results); // 가져온 데이터를 상태에 저장
        // }
        // fetchData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트 될 때만 일회성으로 fetchData 함수를 호출

    return (
        <div>
            {books.map((book, index) => ( // books 배열을 map으로 순회하며 각 책의 정보를 표시
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