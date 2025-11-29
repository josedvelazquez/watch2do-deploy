"use client";

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { ShippingForm, ShippingData } from "@/components/checkout/shipping-form";
import { PaymentMethodSelector } from "@/components/checkout/payment-method-selector";
import { CreditCardForm } from "@/components/checkout/credit-card-form";
import { SecurityBadges } from "@/components/ui/security-badges";
import { Check, Loader2 } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CheckoutStep = 'shipping' | 'payment' | 'card-details' | 'success';

export default function CheckoutPage() {
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [shippingData, setShippingData] = useState<ShippingData | null>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
    const { updateCartCount } = useCart();
    const router = useRouter();

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch("/api/cart");
                if (res.ok) {
                    const data = await res.json();
                    setCartItems(data.items || []);
                }
            } catch (error) {
                console.error("Failed to fetch cart", error);
            }
        };
        fetchCart();
    }, []);

    useEffect(() => {
        if (step === 'success') {
            window.scrollTo(0, 0);
        }
    }, [step]);

    const totalAmount = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

    const handleShippingSubmit = (data: ShippingData) => {
        setShippingData(data);
        setStep('payment');
    };

    const handlePaymentSelect = (method: string) => {
        setSelectedPaymentMethod(method);
        if (method === 'card') {
            setStep('card-details');
        } else {
            // For other methods, proceed directly to processing
            processOrder(method);
        }
    };

    const processOrder = async (method: string) => {
        setIsProcessing(true);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shippingData,
                    paymentMethod: method,
                    items: cartItems
                })
            });

            if (res.ok) {
                await updateCartCount(); // Refresh cart count (should be 0)
                setStep('success');
            } else {
                console.error("Checkout failed");
                // Handle error (show toast, etc.)
            }
        } catch (error) {
            console.error("Checkout error", error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (step === 'success') {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
                    <div className="max-w-md w-full bg-zinc-900/50 border border-white/5 rounded-2xl p-8 text-center backdrop-blur-sm animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">¡Gracias por tu compra!</h2>
                        <p className="text-gray-400 mb-8">
                            Tu pedido ha sido procesado exitosamente. Hemos enviado un correo de confirmación a {shippingData?.email}.
                        </p>
                        <Link href="/">
                            <Button className="w-full bg-[#D4AF37] hover:bg-[#B59530] text-black font-bold h-12">
                                Volver al Inicio
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-center mb-12 relative">
                        {/* Connecting Line Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-gray-200 dark:bg-zinc-800 rounded-full" />

                        {/* Connecting Line Progress */}
                        <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1 bg-[#D4AF37] rounded-full transition-all duration-500 ease-out ${step === 'payment' || step === 'card-details' ? 'w-48' : 'w-0'
                                }`}
                        />

                        <div className="relative z-10 flex justify-between w-64">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === 'shipping' || step === 'payment' || step === 'card-details'
                                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-110'
                                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border border-gray-200 dark:border-zinc-700'
                                    }`}>
                                    {step === 'payment' || step === 'card-details' ? <Check className="w-5 h-5" /> : '1'}
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${step === 'shipping' ? 'text-[#D4AF37]' : 'text-gray-400 dark:text-zinc-500'
                                    }`}>
                                    Envío
                                </span>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step === 'payment' || step === 'card-details'
                                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-110'
                                    : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 border border-gray-200 dark:border-zinc-700'
                                    }`}>
                                    2
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${step === 'payment' || step === 'card-details' ? 'text-[#D4AF37]' : 'text-gray-400 dark:text-zinc-500'
                                    }`}>
                                    Pago
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className="bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm relative shadow-xl dark:shadow-none">
                        {isProcessing && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
                                    <p className="text-white font-medium">Procesando tu pedido...</p>
                                </div>
                            </div>
                        )}

                        {step === 'shipping' && (
                            <ShippingForm onContinue={handleShippingSubmit} />
                        )}

                        {step === 'payment' && (
                            <PaymentMethodSelector
                                onBack={() => setStep('shipping')}
                                onSelect={handlePaymentSelect}
                            />
                        )}

                        {step === 'card-details' && (
                            <CreditCardForm
                                amount={totalAmount}
                                onPay={() => processOrder('card')}
                                onBack={() => setStep('payment')}
                            />
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
