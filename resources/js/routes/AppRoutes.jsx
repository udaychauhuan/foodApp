import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Foods from '../pages/Foods';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/foods" element={<Foods />} />
            </Routes>
        </BrowserRouter>
    );
}