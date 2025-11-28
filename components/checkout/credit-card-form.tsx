"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface CreditCardFormProps {
    amount: number;
    onPay: () => void;
    onBack: () => void;
}

export function CreditCardForm({ amount, onPay, onBack }: CreditCardFormProps) {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        let formattedValue = value;

        // Lógica de formato simple
        if (id === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        } else if (id === 'expiry') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
        } else if (id === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        setFormData(prev => ({ ...prev, [id]: formattedValue }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onPay();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-serif font-bold text-white">Pago con Tarjeta</h2>
                <p className="text-muted-foreground">
                    Ingresa los datos de tu tarjeta para completar la compra de ${amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                    <Label htmlFor="cardNumber">Número de Tarjeta</Label>
                    <div className="relative">
                        <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="bg-white/5 border-white/10 pl-10"
                            required
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cardName">Nombre en la Tarjeta</Label>
                    <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        placeholder="COMO APARECE EN LA TARJETA"
                        className="bg-white/5 border-white/10 uppercase"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Fecha de Expiración</Label>
                        <Input
                            id="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/AA"
                            className="bg-white/5 border-white/10"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <div className="relative">
                            <Input
                                id="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                className="bg-white/5 border-white/10 pl-10"
                                required
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-medium bg-[#D4AF37] text-black hover:bg-[#B59530] transition-all"
                    >
                        Pagar ${amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                    </Button>
                    <Button
                        type="button"
                        onClick={onBack}
                        variant="ghost"
                        className="w-full text-white hover:text-primary hover:bg-white/5"
                    >
                        Volver a Métodos de Pago
                    </Button>
                </div>
            </form>
        </div>
    );
}
