import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const text = `Hola, mi nombre es ${formData.name}.%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0AMensaje: ${formData.message}`;
        const whatsappUrl = `https://wa.me/56981293237?text=${text}`;

        window.open(whatsappUrl, '_blank');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

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
                                    <p className="text-coffee/80">+569 8129 3237</p>
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

                    <div className="bg-cream p-8 md:p-12 rounded-3xl shadow-xl border border-wood/10">
                        <h3 className="text-3xl font-serif font-bold text-wood mb-8">Escríbenos</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-bold text-wood uppercase tracking-wider">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                                        placeholder="Tu nombre"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-wood uppercase tracking-wider">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
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
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-wood uppercase tracking-wider">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white border border-wood/20 rounded-lg px-4 py-3 focus:outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta transition-all resize-none"
                                    placeholder="¿En qué podemos ayudarte?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-terracotta text-white font-bold py-4 rounded-lg hover:bg-coral transition-colors duration-300 flex items-center justify-center gap-2 shadow-lg shadow-terracotta/20 cursor-pointer"
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
