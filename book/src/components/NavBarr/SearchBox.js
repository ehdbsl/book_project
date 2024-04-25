import React from 'react';
import './SearchBox.css';
import axios from 'axios';
import searchbtn from './zoom.png';

function SearchBox() {


    return (
        <div className="container">
            <div className="pc-search">
                <input type='text' id="input-search" placeholder='검색어를 입력하세요.'></input>
                <img src={searchbtn} alt="search" id="btn-search" />
            </div>
        </div>
    )
};

export default SearchBox;