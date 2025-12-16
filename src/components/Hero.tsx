import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section id="#" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-wood/5 -skew-x-12 translate-x-20 z-0" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cookie/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 z-0" />

            <div className="container mx-auto px-4 md:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">

                {/* Text Content */}
                <div className="space-y-8 text-center md:text-left animate-fade-in-up">
                    <div className="inline-block px-4 py-1 border border-wood/30 rounded-full bg-white/50 backdrop-blur-sm">
                        <span className="text-wood text-sm font-medium tracking-widest uppercase">Hecho en San Felipe</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-coffee leading-tight">
                        El sabor de <br />
                        <span className="text-terracotta italic">volver a casa</span>
                    </h1>

                    <p className="text-lg md:text-xl text-coffee/80 max-w-lg mx-auto md:mx-0 leading-relaxed">
                        Repostería artesanal que une la nostalgia de la infancia con la calidad que mereces.
                        Un reencuentro con nuestras raíces en cada bocado.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="#galeria"
                            className="group bg-terracotta text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-coral hover:shadow-lg hover:shadow-terracotta/30 flex items-center justify-center gap-2"
                        >
                            Ver Menú
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="#historia"
                            className="px-8 py-4 rounded-full font-medium text-wood border border-wood hover:bg-wood hover:text-white transition-all duration-300 flex items-center justify-center"
                        >
                            Nuestra Historia
                        </a>
                    </div>
                </div>

                {/* Image Content */}
                <div className="relative h-[500px] md:h-[600px] w-full rounded-t-full rounded-b-[200px] overflow-hidden border-4 border-white shadow-2xl shadow-wood/20 transform hover:scale-[1.02] transition-transform duration-700 ease-in-out">
                    <img
                        src="prod_1.png"
                        alt="Pastel artesanal delicioso"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-coffee/40 to-transparent mix-blend-multiply" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
