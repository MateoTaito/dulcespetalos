import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-wood text-cream py-12">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-2xl font-bold mb-2">Dulces Pétalos SF</h3>
                        <p className="text-cream/60 text-sm">© {new Date().getFullYear()} Todos los derechos reservados.</p>
                    </div>

                    <div className="flex gap-6">
                        <a href="#" className="hover:text-terracotta transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="hover:text-terracotta transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
