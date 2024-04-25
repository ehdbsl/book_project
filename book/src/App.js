import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBarr from './components/NavBarr/NavBarr'
import EvenContent from './components/EventContent/EventContent';
// import RecContent from './components/RecContent/RecContent';
import RecContents from './components/RecContents/RecContents';
// import BestSellerList from './components/BestSellerList/BestSeller';
import Places from './components/Places/Places';
import Footer from './components/Footer/Footer';
import Notice from './components/Notice/Notice';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/notice" element={<Notice />} />
            </Routes>
            <div>
                <NavBarr />
                <EvenContent />
                <RecContents />
                <Places />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;