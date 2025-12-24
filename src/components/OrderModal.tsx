import { useState } from 'react';
import { X, ChevronLeft } from 'lucide-react';

export type ProductCategory = 'Torta' | 'Pie' | 'Tiramisú' | 'Kuchen' | 'Tartaleta de berries' | 'Cáterin';
export type CaterinType = 'Dulce' | 'Salado' | 'Dulce y Salado';

export interface OrderDetails {
    category: ProductCategory;
    size?: string;
    cakeType?: string;
    flavor?: string;
    caterinType?: CaterinType;
    dedication?: string;
    edibleImage?: boolean;
    referenceName: string;
    deliveryMethod: 'pickup' | 'delivery';
    pickupTime?: string;
    deliveryTimeWindow?: string;
    address?: string;
    documentType: 'boleta' | 'factura';
    invoiceDetails?: {
        businessName: string;
        rut: string;
        giro: string;
        address: string;
        email: string;
    };
}

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (details: OrderDetails) => void;
}

const CAKE_TYPES = [
    { name: 'Folken', flavors: [] },
    { name: 'Tres leches', flavors: ['Frambuesa', 'Simple'] },
    { name: 'Mil hojas', flavors: ['Frambuesa', 'Lúcuma', 'Simple'] },
    { name: 'Bizcocho', flavors: ['Piña', 'Manjar Nuez'] },
    { name: 'Torta de yogurt', flavors: [] }
];

const CAKE_SIZES = ['10p', '20p', '30p'];
const CATERIN_TYPES: CaterinType[] = ['Dulce', 'Salado', 'Dulce y Salado'];
const DELIVERY_TIME_WINDOWS = [
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00'
];

const IMAGE_PRICE = 4000;
const DELIVERY_PRICE = 3000;

const PRODUCT_PRICES: Record<string, any> = {
    'Torta': {
        'Mil hojas': {
            'Frambuesa': { '10p': 24900, '20p': 34900, '30p': 39900 },
            'Lúcuma': { '10p': 24900, '20p': 34900, '30p': 39900 },
            'Simple': { '10p': 22900, '20p': 28900, '30p': 34900 }
        },
        'Folken': {
            'default': { '10p': 24900, '20p': 34900, '30p': 39900 }
        },
        'Tres leches': {
            'Frambuesa': { '10p': 22900, '20p': 28900, '30p': 35900 },
            'Simple': { '10p': 19900, '20p': 24900, '30p': 30900 }
        },
        'Bizcocho': {
            'Piña': { '10p': 19900, '20p': 24900, '30p': 30900 },
            'Manjar Nuez': { '10p': 19900, '20p': 24900, '30p': 30900 }
        },
        'Torta de yogurt': {
            'default': { '10p': 19900, '20p': 24900, '30p': 30900 }
        }
    },
    'Tiramisú': 20900,
    'Kuchen': 11900,
    'Pie': {
        'Normal': 12900,
        'Sabores': 16900
    },
    'Tartaleta de berries': 18900
};

const SPECIAL_CATEGORY_CONFIG: Record<string, { size: string; flavors?: string[] }> = {
    'Pie': { size: '14p', flavors: ['Normal', 'Sabores'] },
    'Kuchen': { size: '14p' },
    'Tiramisú': { size: '14p' },
    'Tartaleta de berries': { size: '14p' }
};

const OrderModal = ({ isOpen, onClose, onConfirm }: OrderModalProps) => {
    const [step, setStep] = useState<'category' | 'details' | 'dedication' | 'image' | 'delivery' | 'billing'>('category');
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

    // Form state
    const [size, setSize] = useState<string>('');
    const [cakeType, setCakeType] = useState<string>('');
    const [flavor, setFlavor] = useState<string>('');
    const [caterinType, setCaterinType] = useState<CaterinType | null>(null);

    // Dedication state
    const [wantsDedication, setWantsDedication] = useState(false);
    const [dedication, setDedication] = useState('');

    // Edible Image state
    const [wantsImage, setWantsImage] = useState(false);

    // Delivery/Pickup state
    const [referenceName, setReferenceName] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
    const [pickupTime, setPickupTime] = useState('');
    const [pickupTimeError, setPickupTimeError] = useState('');
    const [deliveryTimeWindow, setDeliveryTimeWindow] = useState('');
    const [address, setAddress] = useState('');
    const [addressError, setAddressError] = useState('');

    // Billing state
    const [documentType, setDocumentType] = useState<'boleta' | 'factura'>('boleta');
    const [invoiceDetails, setInvoiceDetails] = useState({
        businessName: '',
        rut: '',
        giro: '',
        address: '',
        email: ''
    });

    if (!isOpen) return null;

    const categories: ProductCategory[] = ['Torta', 'Pie', 'Tiramisú', 'Kuchen', 'Tartaleta de berries', 'Cáterin'];

    const handleCategoryClick = (category: ProductCategory) => {
        setSelectedCategory(category);
        // Reset form
        setSize('');
        setCakeType('');
        setFlavor('');
        setCaterinType(null);
        setWantsDedication(false);
        setDedication('');
        setWantsImage(false);
        setReferenceName('');
        setDeliveryMethod('pickup');
        setPickupTime('');
        setPickupTimeError('');
        setDeliveryTimeWindow('');
        setAddress('');
        setAddressError('');
        setDocumentType('boleta');
        setInvoiceDetails({
            businessName: '',
            rut: '',
            giro: '',
            address: '',
            email: ''
        });

        if (category === 'Torta') {
            setStep('details');
        } else if (category in SPECIAL_CATEGORY_CONFIG) {
            setStep('details');
            setSize(SPECIAL_CATEGORY_CONFIG[category].size);
        } else if (category === 'Cáterin') {
            setStep('details');
        } else {
            setStep('dedication');
        }
    };

    const handleBack = () => {
        if (step === 'billing') {
            setStep('delivery');
            return;
        }
        if (step === 'delivery') {
            setStep('image');
            return;
        }
        if (step === 'image') {
            setStep('dedication');
            return;
        }
        if (step === 'dedication') {
            setStep('details');
            return;
        }
        setStep('category');
        setSelectedCategory(null);
        setCaterinType(null);
    };

    const handleContinue = () => {
        if (step === 'details') {
            setStep('dedication');
        } else if (step === 'dedication') {
            setStep('image');
        } else if (step === 'image') {
            setStep('delivery');
        } else if (step === 'delivery') {
            // Validate delivery step before continuing
            if (!referenceName) return;
            if (deliveryMethod === 'pickup') {
                if (!pickupTime) return;
                const [hours, minutes] = pickupTime.split(':').map(Number);
                const timeValue = hours * 60 + minutes;
                const minTime = 10 * 60;
                const maxTime = 18 * 60;
                if (timeValue < minTime || timeValue > maxTime) {
                    setPickupTimeError('El horario de retiro es entre 10:00 y 18:00.');
                    return;
                }
            } else {
                if (!address || !deliveryTimeWindow) return;
                if (!address.toLowerCase().includes('san felipe')) {
                    setAddressError('La dirección debe ser de San Felipe, Chile.');
                    return;
                }
            }
            setStep('billing');
        }
    };

    const handleFinalConfirm = () => {
        if (!selectedCategory) return;

        onConfirm({
            category: selectedCategory,
            size,
            cakeType: cakeType || undefined,
            flavor: flavor || undefined,
            caterinType: caterinType || undefined,
            dedication: wantsDedication ? dedication : undefined,
            edibleImage: wantsImage,
            referenceName,
            deliveryMethod,
            pickupTime: deliveryMethod === 'pickup' ? pickupTime : undefined,
            deliveryTimeWindow: deliveryMethod === 'delivery' ? deliveryTimeWindow : undefined,
            address: deliveryMethod === 'delivery' ? address : undefined,
            documentType,
            invoiceDetails: documentType === 'factura' ? invoiceDetails : undefined
        });
    }; const selectedCakeTypeData = CAKE_TYPES.find(t => t.name === cakeType);
    const showTortaFlavorSelect = selectedCategory === 'Torta' && selectedCakeTypeData && selectedCakeTypeData.flavors.length > 0;

    const specialConfig = selectedCategory ? SPECIAL_CATEGORY_CONFIG[selectedCategory] : undefined;
    const showSpecialFlavorSelect = specialConfig?.flavors && specialConfig.flavors.length > 0;

    const isFormValid = () => {
        if (selectedCategory === 'Torta') {
            return size && cakeType && (!showTortaFlavorSelect || flavor);
        }
        if (specialConfig) {
            return size && (!showSpecialFlavorSelect || flavor);
        }
        if (selectedCategory === 'Cáterin') {
            return !!caterinType;
        }
        return true;
    };

    const getProductPrice = () => {
        if (!selectedCategory) return 0;

        if (selectedCategory === 'Torta') {
            if (!size || !cakeType) return 0;
            const typeConfig = PRODUCT_PRICES['Torta'][cakeType];
            if (!typeConfig) return 0;

            // Handle cases with flavors (Mil hojas, Tres leches, Bizcocho)
            if (flavor && typeConfig[flavor]) {
                return typeConfig[flavor][size] || 0;
            }
            // Handle cases without specific flavors or default fallback (Folken, Torta de yogurt)
            if (typeConfig['default']) {
                return typeConfig['default'][size] || 0;
            }
            return 0;
        }

        if (selectedCategory === 'Pie') {
            return PRODUCT_PRICES['Pie'][flavor] || PRODUCT_PRICES['Pie']['Normal'] || 0;
        }

        // Simple categories
        return PRODUCT_PRICES[selectedCategory] || 0;
    };

    const calculateTotal = () => {
        let total = getProductPrice();
        if (wantsImage) total += IMAGE_PRICE;
        if (deliveryMethod === 'delivery') total += DELIVERY_PRICE;
        return total;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-wood p-4 flex justify-between items-center text-cream">
                    <div className="flex items-center gap-2">
                        {step !== 'category' && (
                            <button onClick={handleBack} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <h3 className="text-xl font-serif font-bold">
                            {step === 'category' ? '¿Qué deseas pedir?' :
                                step === 'details' ? `Detalles de ${selectedCategory}` :
                                    step === 'dedication' ? 'Dedicatoria' :
                                        step === 'image' ? 'Imagen Comestible' :
                                            step === 'delivery' ? 'Datos de Entrega' :
                                                'Documento Tributario'}
                        </h3>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    {step === 'category' ? (
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className="bg-cream/30 hover:bg-terracotta hover:text-white text-wood font-bold py-4 px-2 rounded-xl transition-all border border-wood/10 shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    ) : step === 'details' ? (
                        <div className="space-y-6">
                            {selectedCategory === 'Cáterin' ? (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Tipo de Cáterin</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {CATERIN_TYPES.map((type) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setCaterinType(type)}
                                                    className={`py-2 px-2 text-sm rounded-lg border transition-all cursor-pointer ${caterinType === type
                                                        ? 'bg-terracotta text-white border-terracotta'
                                                        : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'
                                                        }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {caterinType && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                                            <p className="text-wood font-medium">TODO: Listado de productos para {caterinType}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    {/* Size Selection */}
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Tamaño</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {selectedCategory === 'Torta' ? (
                                                CAKE_SIZES.map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => setSize(s)}
                                                        className={`py-2 px-4 rounded-lg border transition-all cursor-pointer ${size === s
                                                            ? 'bg-terracotta text-white border-terracotta'
                                                            : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'
                                                            }`}
                                                    >
                                                        {s}
                                                    </button>
                                                ))
                                            ) : (
                                                <button
                                                    className="py-2 px-4 rounded-lg border bg-terracotta text-white border-terracotta cursor-default"
                                                >
                                                    {size}
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Type Selection - Only for Torta */}
                                    {selectedCategory === 'Torta' && (
                                        <div>
                                            <label className="block text-wood font-bold mb-2">Tipo de Torta</label>
                                            <select
                                                value={cakeType}
                                                onChange={(e) => {
                                                    setCakeType(e.target.value);
                                                    setFlavor(''); // Reset flavor when type changes
                                                }}
                                                className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                            >
                                                <option value="">Selecciona un tipo...</option>
                                                {CAKE_TYPES.map((type) => (
                                                    <option key={type.name} value={type.name}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {/* Flavor Selection (Conditional) */}
                                    {(showTortaFlavorSelect || showSpecialFlavorSelect) && (
                                        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                            <label className="block text-wood font-bold mb-2">Sabor / Variedad</label>
                                            <select
                                                value={flavor}
                                                onChange={(e) => setFlavor(e.target.value)}
                                                className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                            >
                                                <option value="">Selecciona una opción...</option>
                                                {showTortaFlavorSelect && selectedCakeTypeData?.flavors.map((f) => (
                                                    <option key={f} value={f}>
                                                        {f}
                                                    </option>
                                                ))}
                                                {showSpecialFlavorSelect && specialConfig?.flavors?.map((f) => (
                                                    <option key={f} value={f}>
                                                        {f}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Price Display */}
                            {getProductPrice() > 0 && (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-4 bg-terracotta/10 rounded-xl border border-terracotta/20 text-center">
                                    <p className="text-wood font-medium">Precio del producto</p>
                                    <p className="text-2xl font-bold text-terracotta">
                                        ${getProductPrice().toLocaleString('es-CL')}
                                    </p>
                                </div>
                            )}

                            <button
                                onClick={handleContinue}
                                disabled={!isFormValid()}
                                className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${isFormValid()
                                    ? 'bg-terracotta text-white hover:bg-coral shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continuar
                            </button>
                        </div>
                    ) : step === 'dedication' ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                            <div>
                                <label className="block text-wood font-bold mb-4">¿Deseas agregar una dedicatoria?</label>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setWantsDedication(true)}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${wantsDedication ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        Sí
                                    </button>
                                    <button
                                        onClick={() => setWantsDedication(false)}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${!wantsDedication ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        No
                                    </button>
                                </div>

                                {wantsDedication && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                        <label className="block text-wood font-bold mb-2">Mensaje</label>
                                        <textarea
                                            value={dedication}
                                            onChange={(e) => setDedication(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50 min-h-[100px]"
                                            placeholder="Escribe tu dedicatoria aquí..."
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={wantsDedication && !dedication.trim()}
                                className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${(!wantsDedication || dedication.trim())
                                    ? 'bg-terracotta text-white hover:bg-coral shadow-lg'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Continuar
                            </button>
                        </div>
                    ) : step === 'image' ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                            <div>
                                <label className="block text-wood font-bold mb-4">¿Deseas agregar una imagen comestible?</label>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setWantsImage(true)}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer flex flex-col items-center justify-center ${wantsImage ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        <span>Sí</span>
                                        <span className="text-xs font-normal opacity-80">(+${IMAGE_PRICE.toLocaleString('es-CL')})</span>
                                    </button>
                                    <button
                                        onClick={() => setWantsImage(false)}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${!wantsImage ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        No
                                    </button>
                                </div>

                                {wantsImage && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-200 p-4 bg-amber-50 rounded-xl border border-amber-200">
                                        <p className="text-amber-800 font-medium text-sm">
                                            La imagen debe ser enviada vía WhatsApp después de confirmar el pedido.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleContinue}
                                className="w-full py-3 rounded-xl font-bold transition-all cursor-pointer bg-terracotta text-white hover:bg-coral shadow-lg"
                            >
                                Continuar
                            </button>
                        </div>
                    ) : step === 'delivery' ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                            {/* Reference Name */}
                            <div>
                                <label className="block text-wood font-bold mb-2">Nombre de referencia</label>
                                <input
                                    type="text"
                                    value={referenceName}
                                    onChange={(e) => setReferenceName(e.target.value)}
                                    className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            {/* Delivery Method */}
                            <div>
                                <label className="block text-wood font-bold mb-4">Método de entrega</label>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setDeliveryMethod('pickup')}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${deliveryMethod === 'pickup' ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        Retiro en local
                                    </button>
                                    <button
                                        onClick={() => setDeliveryMethod('delivery')}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer flex flex-col items-center justify-center ${deliveryMethod === 'delivery' ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        <span>Delivery</span>
                                        <span className="text-xs font-normal opacity-80">(+${DELIVERY_PRICE.toLocaleString('es-CL')})</span>
                                    </button>
                                </div>
                            </div>

                            {/* Pickup Time or Address */}
                            {deliveryMethod === 'pickup' ? (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                                    <label className="block text-wood font-bold mb-2">Hora de retiro (10:00 - 18:00)</label>
                                    <input
                                        type="time"
                                        value={pickupTime}
                                        min="10:00"
                                        max="18:00"
                                        onChange={(e) => {
                                            setPickupTime(e.target.value);
                                            setPickupTimeError('');
                                        }}
                                        className={`w-full p-3 rounded-xl border bg-white text-wood focus:outline-none focus:ring-2 ${pickupTimeError ? 'border-red-500 focus:ring-red-200' : 'border-wood/20 focus:ring-terracotta/50'}`}
                                    />
                                    {pickupTimeError && (
                                        <p className="text-red-500 text-sm mt-1">{pickupTimeError}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Dirección de entrega</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => {
                                                setAddress(e.target.value);
                                                setAddressError('');
                                            }}
                                            className={`w-full p-3 rounded-xl border bg-white text-wood focus:outline-none focus:ring-2 ${addressError ? 'border-red-500 focus:ring-red-200' : 'border-wood/20 focus:ring-terracotta/50'}`}
                                            placeholder="Calle, Número, Comuna"
                                        />
                                        {addressError && (
                                            <p className="text-red-500 text-sm mt-1">{addressError}</p>
                                        )}
                                        <p className="text-xs text-wood/60 mt-1">
                                            Solo disponible para San Felipe, Chile.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-wood font-bold mb-2">Ventana Horaria</label>
                                        <select
                                            value={deliveryTimeWindow}
                                            onChange={(e) => setDeliveryTimeWindow(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        >
                                            <option value="">Selecciona un horario...</option>
                                            {DELIVERY_TIME_WINDOWS.map((window) => (
                                                <option key={window} value={window}>
                                                    {window}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={handleContinue}
                                disabled={!referenceName || (deliveryMethod === 'pickup' && !pickupTime) || (deliveryMethod === 'delivery' && (!address || !deliveryTimeWindow))}
                                className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${(!referenceName || (deliveryMethod === 'pickup' && !pickupTime) || (deliveryMethod === 'delivery' && (!address || !deliveryTimeWindow)))
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-terracotta text-white hover:bg-coral shadow-lg'
                                    }`}
                            >
                                Continuar
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
                            <div>
                                <label className="block text-wood font-bold mb-4">Tipo de Documento</label>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setDocumentType('boleta')}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${documentType === 'boleta' ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        Boleta
                                    </button>
                                    <button
                                        onClick={() => setDocumentType('factura')}
                                        className={`flex-1 py-2 rounded-xl border transition-all font-bold cursor-pointer ${documentType === 'factura' ? 'bg-terracotta text-white border-terracotta' : 'bg-white text-wood border-wood/20 hover:border-terracotta/50'}`}
                                    >
                                        Factura
                                    </button>
                                </div>
                            </div>

                            {documentType === 'factura' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Razón Social</label>
                                        <input
                                            type="text"
                                            value={invoiceDetails.businessName}
                                            onChange={(e) => setInvoiceDetails({ ...invoiceDetails, businessName: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-wood font-bold mb-2">RUT</label>
                                        <input
                                            type="text"
                                            value={invoiceDetails.rut}
                                            onChange={(e) => setInvoiceDetails({ ...invoiceDetails, rut: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Giro</label>
                                        <input
                                            type="text"
                                            value={invoiceDetails.giro}
                                            onChange={(e) => setInvoiceDetails({ ...invoiceDetails, giro: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Dirección</label>
                                        <input
                                            type="text"
                                            value={invoiceDetails.address}
                                            onChange={(e) => setInvoiceDetails({ ...invoiceDetails, address: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-wood font-bold mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={invoiceDetails.email}
                                            onChange={(e) => setInvoiceDetails({ ...invoiceDetails, email: e.target.value })}
                                            className="w-full p-3 rounded-xl border border-wood/20 bg-white text-wood focus:outline-none focus:ring-2 focus:ring-terracotta/50"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Price Summary */}
                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
                                <h4 className="font-bold text-wood border-b border-gray-200 pb-2 mb-2">Resumen de Costos</h4>
                                <div className="flex justify-between text-sm text-wood/80">
                                    <span>Producto ({selectedCategory})</span>
                                    <span>${getProductPrice().toLocaleString('es-CL')}</span>
                                </div>
                                {wantsImage && (
                                    <div className="flex justify-between text-sm text-wood/80">
                                        <span>Imagen Comestible</span>
                                        <span>${IMAGE_PRICE.toLocaleString('es-CL')}</span>
                                    </div>
                                )}
                                {deliveryMethod === 'delivery' && (
                                    <div className="flex justify-between text-sm text-wood/80">
                                        <span>Delivery</span>
                                        <span>${DELIVERY_PRICE.toLocaleString('es-CL')}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-lg text-terracotta pt-2 border-t border-gray-200 mt-2">
                                    <span>Total</span>
                                    <span>${calculateTotal().toLocaleString('es-CL')}</span>
                                </div>
                                <div className="bg-terracotta/10 p-3 rounded-lg mt-3 text-center">
                                    <p className="text-terracotta font-bold text-sm">
                                        Abono requerido (50%): ${(calculateTotal() * 0.5).toLocaleString('es-CL')}
                                    </p>
                                    <p className="text-xs text-terracotta/80 mt-1">
                                        Para confirmar tu pedido debes abonar el 50% del total.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleFinalConfirm}
                                disabled={documentType === 'factura' && (!invoiceDetails.businessName || !invoiceDetails.rut || !invoiceDetails.giro || !invoiceDetails.address || !invoiceDetails.email)}
                                className={`w-full py-3 rounded-xl font-bold transition-all cursor-pointer ${documentType === 'factura' && (!invoiceDetails.businessName || !invoiceDetails.rut || !invoiceDetails.giro || !invoiceDetails.address || !invoiceDetails.email)
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-terracotta text-white hover:bg-coral shadow-lg'
                                    }`}
                            >
                                Confirmar Pedido
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
