import Hero from './components/Hero';
import About from './components/About';
import Showcase from './components/Showcase';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { MessageCircle } from 'lucide-react';

function App() {
    return (
        <div className="min-h-screen bg-cream text-coffee font-sans selection:bg-terracotta selection:text-white">
            <Navbar />
            <main>
                <Hero />
                <About />
                <Showcase />
                <Contact />
            </main>
            <Footer />

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/56912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 bg-[#e57952] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 hover:shadow-xl flex items-center justify-center"
                aria-label="Contactar por WhatsApp"
            >
                <MessageCircle size={32} fill="white" />
            </a>
        </div>
    );
}

export default App;
