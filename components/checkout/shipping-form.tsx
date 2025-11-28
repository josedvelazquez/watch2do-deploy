"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export interface ShippingData {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    zip: string;
}

interface ShippingFormProps {
    onContinue: (data: ShippingData) => void;
}

export function ShippingForm({ onContinue }: ShippingFormProps) {
    const [formData, setFormData] = useState<ShippingData>({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onContinue(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-2xl font-serif font-bold text-white">Información de Envío</h2>
                <p className="text-muted-foreground">Ingresa los detalles de destino para tu pedido.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleChange} className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleChange} className="bg-white/5 border-white/10" required />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} className="bg-white/5 border-white/10" required />
            </div>

            <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" value={formData.address} onChange={handleChange} className="bg-white/5 border-white/10" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input id="city" value={formData.city} onChange={handleChange} className="bg-white/5 border-white/10" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zip">Código Postal</Label>
                    <Input id="zip" value={formData.zip} onChange={handleChange} className="bg-white/5 border-white/10" required />
                </div>
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium bg-[#D4AF37] text-black hover:bg-[#B59530] transition-all"
                >
                    Continuar al Pago
                </Button>
            </div>
        </form>
    );
}
