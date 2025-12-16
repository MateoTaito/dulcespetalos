const Showcase = () => {
    const products = [
        {
            id: 1,
            title: "Tarta de Frutos Rojos",
            image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Cheesecake Artesanal",
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Macarons de Autor",
            image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Croissants de Mantequilla",
            image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Pastel de Chocolate Belga",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Galletas Decoradas",
            image: "https://images.unsplash.com/photo-1499636138143-bd630f5cf386?q=80&w=800&auto=format&fit=crop",
        },
    ];

    return (
        <section id="galeria" className="py-24 bg-cream">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <span className="text-terracotta font-medium tracking-widest uppercase text-sm mb-2 block">Nuestro Arte</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood">Delicias del Día</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white"
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-coffee/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <h3 className="text-white font-serif text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    {product.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-coffee/70 italic mb-6">Síguenos en Instagram para ver más creaciones</p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 text-terracotta font-bold hover:text-coral transition-colors border-b-2 border-terracotta/20 hover:border-coral pb-1"
                    >
                        @DulcesPetalosSF
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
