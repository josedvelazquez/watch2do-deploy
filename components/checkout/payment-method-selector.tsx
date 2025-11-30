"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Building2 } from "lucide-react";
import Image from "next/image";

interface PaymentMethodSelectorProps {
    onBack: () => void;
    onSelect: (method: string) => void;
}

export function PaymentMethodSelector({ onBack, onSelect }: PaymentMethodSelectorProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-[42px] font-bold text-black dark:text-white font-serif">Métodos de Pago</h2>
                <p className="text-[#9CA3AF] max-w-2xl mx-auto text-[16px] leading-[24px] font-inter">
                    Elige la forma de pago que más te convenga. Ofrecemos múltiples opciones seguras y confiables.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tarjeta de Crédito/Débito */}
                <div className="bg-white rounded-xl p-6 text-black shadow-lg flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <CreditCard className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Tarjetas de Crédito/Débito</h3>
                                <p className="text-xs text-[#9CA3AF]">Visa, Mastercard, American Express</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#9CA3AF] mb-6">
                            Paga de forma segura con tu tarjeta favorita. Aceptamos todas las principales tarjetas.
                        </p>
                        <div className="flex gap-2 mb-6">
                            {/* Placeholders for card logos */}
                            <Image src="/images/payment-methods/Visa_Logo.png" alt="Visa" width={50} height={50} className="h-8 w-auto object-contain" />
                            <Image src="/images/payment-methods/logo-Mastercard.png" alt="Mastercard" width={50} height={50} className="h-8 w-auto object-contain" />
                            <Image src="/images/payment-methods/american-express-logo.png" alt="American Express" width={50} height={50} className="h-8 w-auto object-contain" />
                        </div>
                    </div>
                    <Button
                        onClick={() => onSelect('card')}
                        className="w-full bg-[#D4AF37] hover:bg-[#c5a028] text-black font-bold"
                    >
                        Seleccionar
                    </Button>
                </div>

                {/* Transferencia Bancaria */}
                <div className="bg-white rounded-xl p-6 text-black shadow-lg flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">Transferencia Bancaria</h3>
                                <p className="text-xs text-[#9CA3AF]">SPEI, Bancos mexicanos</p>
                            </div>
                        </div>
                        <p className="text-sm text-[#9CA3AF] mb-6">
                            Realiza tu pago directamente desde tu cuenta bancaria mediante SPEI.
                        </p>
                        <div className="flex items-center gap-2 mb-6 text-xs text-[#9CA3AF]">
                            <span className="block w-3 h-3 rounded-full border border-[#9CA3AF]"></span>
                            Procesamiento: 1-2 días hábiles
                        </div>
                    </div>
                    <Button
                        onClick={() => onSelect('transfer')}
                        className="w-full bg-[#2D3748] hover:bg-[#1a202c] text-white font-bold"
                    >
                        Seleccionar
                    </Button>
                </div>
            </div>

            {/* Secondary Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {/* OXXO */}
                <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-[#D4AF37]/30">
                    <div className="h-12 flex items-center justify-center mb-3">
                        <Image src="/images/payment-methods/Oxxo_Logo.png" alt="OXXO" width={80} height={40} className="object-contain h-full w-auto" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">OXXO</h4>
                    <p className="text-xs text-[#9CA3AF] mb-4">Paga en efectivo en tienda</p>
                    <Button onClick={() => onSelect('oxxo')} variant="outline" className="w-full text-xs h-8 border-[#9CA3AF] text-[#9CA3AF] hover:text-[#D4AF37] hover:border-[#D4AF37]">Seleccionar</Button>
                </div>

                {/* Clip */}
                <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-[#D4AF37]/30">
                    <div className="h-12 flex items-center justify-center mb-3">
                        <Image src="/images/payment-methods/Logo_de_Clip.png" alt="Clip" width={80} height={40} className="object-contain h-full w-auto" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Clip</h4>
                    <p className="text-xs text-[#9CA3AF] mb-4">Pago rápido con terminal</p>
                    <Button onClick={() => onSelect('clip')} variant="outline" className="w-full text-xs h-8 border-[#9CA3AF] text-[#9CA3AF] hover:text-[#D4AF37] hover:border-[#D4AF37]">Seleccionar</Button>
                </div>

                {/* Kueski Pay */}
                <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-transparent hover:border-[#D4AF37]/30">
                    <div className="h-12 flex items-center justify-center mb-3">
                        <Image src="/images/payment-methods/Kueski.webp" alt="Kueski" width={80} height={40} className="object-contain h-full w-auto" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">Kueski Pay</h4>
                    <p className="text-xs text-[#9CA3AF] mb-4">Compra ahora, paga después</p>
                    <Button onClick={() => onSelect('kueski')} variant="outline" className="w-full text-xs h-8 border-[#9CA3AF] text-[#9CA3AF] hover:text-[#D4AF37] hover:border-[#D4AF37]">Seleccionar</Button>
                </div>
            </div>

            <div className="pt-4">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="text-black dark:text-white hover:text-primary bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                >
                    &larr; Volver a Información de Envío
                </Button>
            </div>
        </div>
    );
}
