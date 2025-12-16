import { useState } from 'react';
import { ChevronLeft, ChevronRight, ClipboardList, CheckCircle2 } from 'lucide-react';

const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

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
        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-24 bg-cream/30 border border-wood/10"></div>);
        }

        // Days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div key={i} className="h-24 bg-white border border-wood/10 p-2 hover:bg-cream transition-colors cursor-pointer group relative">
                    <span className="font-serif font-bold text-wood">{i}</span>
                    {/* Placeholder for events */}
                    <div className="mt-2 hidden group-hover:block">
                        <div className="text-xs text-terracotta bg-terracotta/10 p-1 rounded">Disponible</div>
                    </div>
                </div>
            );
        }
        return days;
    };

    const rules = [
        "Especificar tamaño",
        "Especificar torta",
        "Especificar fecha",
        "Especificar destino",
        "Especificar retiro o delivery (2000 clp) y dentro de SF (lugar de envío)",
        "Agendar fecha mínimo 48 horas de anticipación",
        "Especificar nombre",
        "Especificar dónde es el retiro"
    ];

    return (
        <section className="pt-32 pb-24 min-h-screen bg-cream relative">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#6f4a20_3px,transparent_3px)] [background-size:45px_45px] opacity-[0.05] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-wood mb-4">Agendar Pedido</h2>
                        <p className="text-coffee/80">Revisa nuestra disponibilidad y sigue los pasos para realizar tu pedido.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Calendar Section */}
                        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden border border-wood/10">
                            {/* Calendar Header */}
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

                            {/* Days Header */}
                            <div className="grid grid-cols-7 bg-cream/50 border-b border-wood/10">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                                    <div key={day} className="py-4 text-center font-bold text-wood text-sm uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7">
                                {renderCalendarDays()}
                            </div>
                        </div>

                        {/* Rules Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl shadow-xl p-8 border border-wood/10 sticky top-32">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-terracotta/10 p-3 rounded-full">
                                        <ClipboardList className="text-terracotta" size={24} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-wood">Reglas para Agendar</h3>
                                </div>

                                <div className="space-y-4">
                                    {rules.map((rule, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                                            <CheckCircle2 className="text-terracotta shrink-0 mt-0.5" size={18} />
                                            <p className="text-coffee/90 text-sm leading-relaxed">{rule}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-wood/10">
                                    <p className="text-xs text-coffee/60 italic text-center">
                                        * Todos los pedidos se coordinan directamente vía WhatsApp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalendarPage;
