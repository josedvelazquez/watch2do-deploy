import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Send, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-[56px] leading-[64px] font-bold text-black dark:text-white font-serif">Contáctanos</h1>
                    <p className="text-[#9CA3AF] max-w-2xl mx-auto text-[16px] leading-[24px] font-inter">
                        Estamos aquí para ayudarte. Ponte en contacto con nosotros a través de cualquiera de nuestros canales de comunicación y te responderemos lo antes posible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Form - Left Column */}
                    <div className="lg:col-span-2">
                        <Card className="h-full bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-xl dark:shadow-none">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-bold text-black dark:text-white mb-8 font-serif">Envíanos un mensaje</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium text-[#9CA3AF]">Nombre</label>
                                            <input
                                                id="firstName"
                                                type="text"
                                                className="w-full bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-4 py-3 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder=""
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium text-[#9CA3AF]">Apellido</label>
                                            <input
                                                id="lastName"
                                                type="text"
                                                className="w-full bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-4 py-3 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-[#9CA3AF]">Correo electrónico</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="w-full bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-4 py-3 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-[#9CA3AF]">Teléfono</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            className="w-full bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-4 py-3 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-[#9CA3AF]">Asunto</label>
                                        <div className="relative">
                                            <select
                                                id="subject"
                                                className="right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-md shadow-lg py-1 z-50 text-black dark:text-white"
                                            >
                                                <option value="general" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Consulta general</option>
                                                <option value="support" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Soporte técnico</option>
                                                <option value="sales" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Ventas</option>
                                                <option value="returns" className="bg-white dark:bg-zinc-900 text-black dark:text-white">Devoluciones</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-[#9CA3AF]">Mensaje</label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-4 py-3 text-black dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                                            placeholder="Cuéntanos cómo podemos ayudarte..."
                                        />
                                    </div>

                                    <Button className="w-full text-lg py-6 bg-[#D4AF37] hover:bg-[#B5952F] text-black dark:text-white font-bold">
                                        <Send className="mr-2 h-5 w-5" /> Enviar mensaje
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Info - Right Column */}
                    <div className="space-y-6">
                        {/* Office Card */}
                        <Card className="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-serif">Nuestra oficina</h3>
                                    <p className="text-[#9CA3AF] text-sm leading-relaxed">
                                        Av. Principal 123, Piso 5<br />
                                        Mazatlán, Sinaloa, 01234 México
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Phone Card */}
                        <Card className="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-serif">Teléfono</h3>
                                    <p className="text-[#9CA3AF] text-sm mb-1">+52 55 1234 5678 Lunes a</p>
                                    <p className="text-[#9CA3AF] text-sm mb-1">Viernes: 9:00 - 18:00</p>
                                    <p className="text-[#9CA3AF] text-sm">Sábados: 9:00 - 14:00</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Email Card */}
                        <Card className="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                            <CardContent className="p-6 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center shrink-0 text-[#D4AF37]">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-black dark:text-white mb-2 font-serif">Email</h3>
                                    <p className="text-[#9CA3AF] text-sm hover:text-primary transition-colors cursor-pointer">info@watch2do.com</p>
                                    <p className="text-[#9CA3AF] text-sm hover:text-primary transition-colors cursor-pointer">soporte@watch2do.com</p>
                                    <p className="text-[#9CA3AF] text-sm hover:text-primary transition-colors cursor-pointer">ventas@watch2do.com</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Socials Card */}
                        <Card className="bg-white dark:bg-zinc-900/50 border-gray-200 dark:border-white/10 shadow-lg dark:shadow-none">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-black dark:text-white mb-4 font-serif">Síguenos en redes sociales</h3>
                                <div className="flex gap-4">
                                    <Link href="#" className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                                        <Facebook className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                                        <Twitter className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                                        <Instagram className="h-5 w-5" />
                                    </Link>
                                    <Link href="#" className="w-12 h-12 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                                        <Linkedin className="h-5 w-5" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full h-[400px] rounded-xl overflow-hidden border border-white/10 relative bg-zinc-800">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.506638973338!2d-106.4291062249586!3d23.2296508790288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869f5344478165c3%3A0xfad831d114f05829!2sFacultad%20de%20Inform%C3%A1tica%20Mazatlan!5e0!3m2!1sen!2smx!4v1710890000000!5m2!1sen!2smx"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    ></iframe>
                </div>
            </main>

            <Footer />
        </div>
    );
}
