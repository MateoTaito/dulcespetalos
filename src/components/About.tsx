import { Heart } from 'lucide-react';

const About = () => {
    return (
        <section id="historia" className="py-24 bg-white relative overflow-hidden">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#6f4a20_3px,transparent_3px)] [background-size:45px_45px] opacity-[0.1] pointer-events-none" />
            {/* Decorative pattern */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cream to-white z-10" />

            <div className="container mx-auto px-4 md:px-8 relative z-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood mb-6">Nuestra Historia</h2>
                        <div className="w-24 h-1 bg-terracotta mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="dueño_cocinando.png"
                                    alt="Hermanos cocinando"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-cream p-6 rounded-xl shadow-lg border border-wood/10 max-w-[200px] hidden md:block">
                                <p className="font-serif text-terracotta text-lg italic">"Calidad que se siente en el corazón"</p>
                            </div>
                        </div>

                        <div className="bg-cream/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl border border-wood/10 space-y-6 text-lg text-coffee/90 leading-relaxed relative">
                            <p>
                                Todo comenzó con un sueño compartido y una maleta llena de recuerdos. Somos dos hermanos nacidos y criados aquí, en las calles de <span className="font-bold text-wood">San Felipe</span>.
                            </p>
                            <p>
                                La vida nos llevó a la capital, donde aprendimos, crecimos y perfeccionamos el arte de la pastelería. Pero algo faltaba. El ruido de la gran ciudad nunca pudo reemplazar la calidez de nuestra gente ni la tranquilidad de nuestro valle.
                            </p>
                            <p>
                                Decidimos volver. No solo por nostalgia, sino con una misión: traer de vuelta todo lo aprendido y ofrecer a nuestra comunidad una pastelería de alta calidad, pero con ese sabor inconfundible a hogar.
                            </p>
                            <p className="font-medium text-wood flex items-center gap-2 pt-2">
                                <Heart className="text-terracotta fill-terracotta" size={20} />
                                Dulces Pétalos es nuestra forma de decir "Gracias" a la tierra que nos vio nacer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cream to-white z-10" />
        </section>
    );
};

export default About;
