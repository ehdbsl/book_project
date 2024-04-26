import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBarr from './components/NavBarr/NavBarr'
import EvenContent from './components/EventContent/EventContent';
import RecContents from './components/RecContents/RecContents';
import Places from './components/Places/Places';
import Footer from './components/Footer/Footer';
import Notice from './components/Notice/Notice';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/notice" element={<Notice />} />
                <NavBarr />
                <EvenContent />
                <RecContents />
                <Places />
                <Footer />

            </Routes>
        </BrowserRouter>
    );
}

export default App;