import { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '/#' },
        { name: 'Historia', href: '/#historia' },
        { name: 'Galería', href: '/#galeria' },
        { name: 'Contacto', href: '/#contacto' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src="/dulces_petalos_logo.jpg"
                        alt="Dulces Pétalos Logo"
                        className="h-12 w-12 rounded-full object-cover border-2 border-wood"
                    />
                    <span className="font-serif text-xl md:text-2xl font-bold text-wood tracking-wide">
                        Dulces Pétalos SF
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-coffee hover:text-terracotta transition-colors duration-300 font-medium text-sm uppercase tracking-wider"
                        >
                            {link.name}
                        </a>
                    ))}

                    <Link
                        to="/calendario"
                        className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-300 ${location.pathname === '/calendario'
                            ? 'bg-terracotta text-white shadow-md'
                            : 'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white'
                            }`}
                    >
                        <Calendar size={18} />
                        <span>Agendar</span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-wood hover:text-terracotta transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-cream border-t border-wood/20 shadow-lg py-4 flex flex-col items-center gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-coffee hover:text-terracotta font-medium text-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <Link
                        to="/calendario"
                        className="flex items-center gap-2 text-terracotta font-bold text-lg mt-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <Calendar size={20} />
                        Agendar
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
