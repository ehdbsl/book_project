import React from 'react';
// import Navbar from './components/Navbar/Navbar';
import NavBarr from './components/NavBarr/NavBarr'
import EvenContent from './components/EventContent/EventContent';
// import RecContent from './components/RecContent/RecContent';
import RecContents from './components/RecContents/RecContents';
import BestSellerList from './components/BestSellerList/BestSeller';
import Places from './components/Places/Places';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div>
            <NavBarr />
            <EvenContent />
            {/* <RecContent /> */}
            <RecContents />
            <BestSellerList />
            <Places />
            <Footer />
        </div>
    );
}

export default App;