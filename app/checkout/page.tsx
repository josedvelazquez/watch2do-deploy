import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/ui/newsletter";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">Checkout</h1>

                <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                            <input type="text" placeholder="Last Name" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                        </div>
                        <input type="email" placeholder="Email Address" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                        <input type="text" placeholder="Address" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="City" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                            <input type="text" placeholder="Postal Code" className="bg-white/5 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white">Payment Details</h2>
                        <div className="bg-white/5 p-6 rounded-lg border border-white/10 space-y-4">
                            <input type="text" placeholder="Card Number" className="bg-black/20 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="bg-black/20 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                                <input type="text" placeholder="CVC" className="bg-black/20 border border-white/10 rounded px-4 py-3 text-white w-full focus:outline-none focus:border-primary" />
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="flex justify-between text-lg font-bold text-white mb-6">
                                <span>Total</span>
                                <span className="text-primary">$2,373.84</span>
                            </div>
                            <Button className="w-full h-12 text-lg">
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            <Newsletter />
            <Footer />
        </div>
    );
}
