import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Foods from '../pages/Foods';
import Auth from "../pages/Auth/Auth";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Protected Route */}
                <Route 
                    path="/foods" 
                    element={
                        <ProtectedRoute>
                            <Foods />
                        </ProtectedRoute>
                    } 
                />

                {/* Guest Only (Login/Register) */}
                <Route 
                    path="/auth" 
                    element={
                        <GuestRoute>
                            <Auth />
                        </GuestRoute>
                    } 
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}