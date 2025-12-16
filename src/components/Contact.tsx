import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contacto" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <div className="space-y-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood mb-6">Visítanos</h2>
                            <p className="text-lg text-coffee/80 leading-relaxed">
                                Estamos ubicados en el corazón de San Felipe. Ven a disfrutar de un café y un dulce momento con nosotros.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-cream p-3 rounded-full border border-wood/20">
                                    <MapPin className="text-terracotta" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-wood text-lg">Dirección</h4>
                                    <p className="text-coffee/80">Marta Haramboure 1580, San Felipe, Chile 2170000</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-cream p-3 rounded-full border border-wood/20">
                                    <Phone className="text-terracotta" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-wood text-lg">Teléfono</h4>
                                    <p className="text-coffee/80">+56 9 1234 5678</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-cream p-3 rounded-full border border-wood/20">
                                    <Mail className="text-terracotta" size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-wood text-lg">Email</h4>
                                    <p className="text-coffee/80">contacto@dulcespetalos.cl</p>
                                </div>
                            </div>
                        </div>

                        <div className="h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-wood/10">
                            <iframe
                                src="https://maps.google.com/maps?q=Marta+Haramboure+1580,+San+Felipe,+Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Mapa de ubicación"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-cream p-8 md:p-12 rounded-3xl shadow-xl border border-wood/10">
                        <h3 className="text-3xl font-serif font-bold text-wood mb-8">Escríbenos</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-wood uppercase tracking-wider">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-wood uppercase tracking-wider">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                                        placeholder="+56 9..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-wood uppercase tracking-wider">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-wood uppercase tracking-wider">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all resize-none"
                                    placeholder="¿En qué podemos ayudarte?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-terracotta text-white font-bold py-4 rounded-lg hover:bg-coral transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20"
                            >
                                Enviar Mensaje
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
