import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { MessageCircle } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalendarPage from './pages/CalendarPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-cream text-coffee font-sans selection:bg-terracotta selection:text-white">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/calendario" element={<CalendarPage />} />
                    </Routes>
                </main>
                <Footer />

                <a
                    href="https://wa.me/+56981293237"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-8 right-8 z-50 bg-[#e57952] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl flex items-center justify-center"
                    aria-label="Contactar por WhatsApp"
                >
                    <MessageCircle size={32} fill="white" />
                </a>
            </div>
        </Router>
    );
}

export default App;
