"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useState } from "react";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { SecurityBadges } from "@/components/ui/security-badges";
import { Check } from "lucide-react";

type CheckoutStep = 'shipping' | 'payment';

export default function CheckoutPage() {
    const [step, setStep] = useState<CheckoutStep>('shipping');

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Indicator */}
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-12 relative">
                        {/* Connecting Line Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-zinc-800 rounded-full" />

                        {/* Connecting Line Progress */}
                        <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] rounded-full transition-all duration-500 ease-out ${step === 'payment' ? 'w-48' : 'w-0'
                                }`}
                        />

                        <div className="relative z-10 flex justify-between w-64">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === 'shipping' || step === 'payment'
                                        ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-110'
                                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                                    }`}>
                                    {step === 'payment' ? <Check className="w-5 h-5" /> : '1'}
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${step === 'shipping' ? 'text-[#D4AF37]' : 'text-zinc-500'
                                    }`}>
                                    Envío
                                </span>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === 'payment'
                                        ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-110'
                                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                                    }`}>
                                    2
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${step === 'payment' ? 'text-[#D4AF37]' : 'text-zinc-500'
                                    }`}>
                                    Pago
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                        {step === 'shipping' && (
                            <ShippingForm onContinue={() => setStep('payment')} />
                        )}

                        {step === 'payment' && (
                            <PaymentMethodSelector onBack={() => setStep('shipping')} />
                        )}
                    </div>
                    {/* Security Badges */}
                    <SecurityBadges />
                </div>
            </main>

            <Footer />
        </div>
    );
}
