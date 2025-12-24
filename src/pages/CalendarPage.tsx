import { useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import OrderModal, { OrderDetails } from '../components/OrderModal';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderConfirm = (details: OrderDetails) => {
        if (!selectedDate) return;

        const formattedDate = selectedDate.toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
        let message = `Hola! Quiero agendar un pedido para el día ${formattedDate}.\n`;
        message += `Categoría: ${details.category}`;

        if (details.category === 'Torta') {
            message += `\nTamaño: ${details.size}`;
            message += `\nTipo: ${details.cakeType}`;
            if (details.flavor) {
                message += `\nSabor: ${details.flavor}`;
            }
        } else if (['Pie', 'Kuchen', 'Tiramisú'].includes(details.category)) {
            if (details.size) message += `\nTamaño: ${details.size}`;
            if (details.flavor) message += `\nSabor: ${details.flavor}`;
        } else if (details.category === 'Cáterin') {
            if (details.caterinType) message += `\nTipo: ${details.caterinType}`;
        }

        if (details.dedication) {
            message += `\n\nDedicatoria: ${details.dedication}`;
        }

        if (details.edibleImage) {
            message += `\n\n*Incluye imagen comestible (se enviará por este chat)*`;
        }

        message += `\n\n--- Datos de Entrega ---`;
        message += `\nNombre de referencia: ${details.referenceName}`;
        message += `\nMétodo: ${details.deliveryMethod === 'pickup' ? 'Retiro en local' : 'Delivery'}`;

        if (details.deliveryMethod === 'pickup' && details.pickupTime) {
            message += `\nHora de retiro: ${details.pickupTime}`;
        } else if (details.deliveryMethod === 'delivery' && details.address) {
            message += `\nDirección: ${details.address}`;
            if (details.deliveryTimeWindow) {
                message += `\nVentana Horaria: ${details.deliveryTimeWindow}`;
            }
        }

        message += `\n\n--- Documento Tributario ---`;
        message += `\nTipo: ${details.documentType === 'boleta' ? 'Boleta' : 'Factura'}`;

        if (details.documentType === 'factura' && details.invoiceDetails) {
            message += `\nRazón Social: ${details.invoiceDetails.businessName}`;
            message += `\nRUT: ${details.invoiceDetails.rut}`;
            message += `\nGiro: ${details.invoiceDetails.giro}`;
            message += `\nDirección: ${details.invoiceDetails.address}`;
            message += `\nEmail: ${details.invoiceDetails.email}`;
        }

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "+56981293237";

        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        setIsModalOpen(false);
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const renderCalendarDays = () => {
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-cream/30 border border-wood/10"></div>);
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 2);

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            const isSelectable = date >= minDate;

            days.push(
                <div
                    key={i}
                    onClick={() => isSelectable && setSelectedDate(date)}
                    className={`h-24 border border-wood/10 p-2 transition-all group relative ${!isSelectable
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : isSelected
                            ? 'bg-terracotta text-white shadow-inner cursor-pointer'
                            : 'bg-white hover:bg-cream cursor-pointer'
                        }`}
                >
                    <span className={`font-serif font-bold ${isSelected ? 'text-white' : !isSelectable ? 'text-gray-300' : 'text-wood'}`}>{i}</span>
                    {/* Placeholder for events */}
                    {isSelectable && (
                        <div className="mt-2 hidden group-hover:block">
                            <div className={`text-xs p-1 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-terracotta/10 text-terracotta'}`}>
                                Disponible
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return days;
    };

    const handleOrderClick = () => {
        if (!selectedDate) return;
        setIsModalOpen(true);
    };

    return (
        <section className="pt-32 pb-24 min-h-screen bg-cream relative">
            <div className="absolute inset-0 bg-[radial-gradient(#6f4a20_3px,transparent_3px)] [background-size:45px_45px] opacity-[0.05] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood mb-4">Agendar Pedido</h2>
                        <p className="text-coffee/80">Revisa nuestra disponibilidad y selecciona una fecha para tu pedido.</p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-wood/10">
                        <div className="bg-wood p-6 flex justify-between items-center text-cream">
                            <button onClick={prevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <ChevronLeft size={24} />
                            </button>
                            <h3 className="text-2xl font-serif font-bold">
                                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                            </h3>
                            <button onClick={nextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 bg-cream/50 border-b border-wood/10">
                            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                                <div key={day} className="py-4 text-center font-bold text-wood text-sm uppercase tracking-wider">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {renderCalendarDays()}
                        </div>
                        <div className="p-8 bg-cream/20 border-t border-wood/10 flex flex-col items-center">
                            <button
                                onClick={handleOrderClick}
                                disabled={!selectedDate}
                                className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all mb-4 ${selectedDate
                                    ? 'bg-terracotta text-white hover:bg-coral shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-1'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <MessageCircle size={20} />
                                {selectedDate ? 'Agendar Pedido' : 'Selecciona una fecha'}
                            </button>
                            <p className="text-xs text-coffee/60 italic text-center">
                                * Todos los pedidos se coordinan directamente vía WhatsApp.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleOrderConfirm}
            />
        </section>
    );
};



export default CalendarPage;
