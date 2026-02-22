import { XIcon, MapPin, User, Mail, Home, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const AddressModal = ({ setShowAddressModal, onSaveAddress, existingAddress }) => {
    const [address, setAddress] = useState(
        existingAddress || {
            name: '',
            email: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            phone: ''
        }
    );

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validaciones
        if (!address.name.trim()) {
            toast.error("El nombre completo es requerido");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(address.email)) {
            toast.error("Ingresa un email válido");
            return;
        }
        
        if (!address.phone.trim()) {
            toast.error("El número de teléfono es requerido");
            return;
        }
        
        if (!address.street.trim()) {
            toast.error("La dirección es requerida");
            return;
        }
        
        if (!address.city.trim()) {
            toast.error("La ciudad es requerida");
            return;
        }
        
        if (!address.country.trim()) {
            toast.error("El país es requerido");
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Simular una pequeña demora
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Guardar dirección
            onSaveAddress(address);
            
            toast.success(
                existingAddress 
                    ? "Dirección actualizada correctamente" 
                    : "Dirección guardada correctamente"
            );
            
            setShowAddressModal(false);
        } catch (error) {
            toast.error("Hubo un error al guardar la dirección");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Lista de países sugeridos (puedes expandir esta lista)
    const suggestedCountries = [
        "Guatemala",
        "México",
        "Estados Unidos",
        "España",
        "Argentina",
        "Chile",
        "Colombia",
        "Perú",
        "El Salvador",
        "Honduras",
        "Nicaragua",
        "Costa Rica",
        "Panamá",
        "República Dominicana",
        "Venezuela"
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <MapPin size={24} />
                                {existingAddress ? "Editar Dirección" : "Nueva Dirección"}
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Completa los datos para recibir tu pedido
                            </p>
                        </div>
                        <button
                            onClick={() => setShowAddressModal(false)}
                            className="text-slate-500 hover:text-slate-700 transition p-2"
                            aria-label="Cerrar"
                        >
                            <XIcon size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Nombre completo */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                <User size={16} />
                                Nombre completo *
                            </label>
                            <input
                                name="name"
                                value={address.name}
                                onChange={handleAddressChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                type="text"
                                placeholder="Ej: Juan Pérez Gómez"
                                required
                                maxLength={100}
                            />
                        </div>

                        {/* Email y Teléfono */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Mail size={16} />
                                    Email *
                                </label>
                                <input
                                    name="email"
                                    value={address.email}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                    type="email"
                                    placeholder="juan@ejemplo.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                    <Phone size={16} />
                                    Teléfono *
                                </label>
                                <input
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                    type="tel"
                                    placeholder="Ej: +502 1234-5678"
                                    required
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div>
                            <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                <Home size={16} />
                                Dirección completa *
                            </label>
                            <input
                                name="street"
                                value={address.street}
                                onChange={handleAddressChange}
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                type="text"
                                placeholder="Calle, número, colonia, referencias"
                                required
                            />
                            <p className="text-xs text-slate-500 mt-1">
                                Incluye referencias para una entrega más precisa
                            </p>
                        </div>

                        {/* Ciudad y Estado/Departamento */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Ciudad *
                                </label>
                                <input
                                    name="city"
                                    value={address.city}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                    type="text"
                                    placeholder="Ej: Ciudad de Guatemala"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Estado/Departamento *
                                </label>
                                <input
                                    name="state"
                                    value={address.state}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                    type="text"
                                    placeholder="Ej: Guatemala"
                                    required
                                />
                            </div>
                        </div>

                        {/* Código Postal y País */}
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Código Postal
                                </label>
                                <input
                                    name="zip"
                                    value={address.zip}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition"
                                    type="text"
                                    placeholder="Ej: 01001"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    País *
                                </label>
                                <div className="relative">
                                    <input
                                        name="country"
                                        value={address.country}
                                        onChange={handleAddressChange}
                                        list="countries"
                                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition pr-10"
                                        type="text"
                                        placeholder="Ej: Guatemala"
                                        required
                                    />
                                    <datalist id="countries">
                                        {suggestedCountries.map((country, index) => (
                                            <option key={index} value={country} />
                                        ))}
                                    </datalist>
                                    <div className="absolute right-3 top-3 text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    Escribe o selecciona tu país
                                </p>
                            </div>
                        </div>

                        {/* Instrucciones adicionales (opcional) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Instrucciones adicionales (opcional)
                            </label>
                            <textarea
                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition min-h-20"
                                placeholder="Ej: Llamar antes de llegar, dejar con el portero, etc."
                            />
                        </div>

                        {/* Botones */}
                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAddressModal(false)}
                                className="flex-1 border border-slate-300 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-50 transition"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-slate-800 text-white font-medium py-3 rounded-lg hover:bg-slate-900 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Guardando...
                                    </span>
                                ) : (
                                    existingAddress ? "Actualizar Dirección" : "Guardar Dirección"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;