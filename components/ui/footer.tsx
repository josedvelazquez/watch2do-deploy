"use client";

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function Footer() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-black dark:text-white mb-6 font-serif">
                            {mounted ? (
                                <Image
                                    src={theme === 'dark' ? "/images/logoW2D.png" : "/images/logoW2D.png"}
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            ) : (
                                <div className="w-[40px] h-[40px]" />
                            )}
                            Watch2Do
                        </Link>
                        <p className="text-[#9CA3AF] text-sm mb-6 leading-relaxed">
                            Tu destino para relojes de lujo y accesorios premium. Calidad, elegancia y precisión en cada pieza.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 shadow-md dark:shadow-none flex items-center justify-center text-[#9CA3AF] hover:bg-primary hover:text-black transition-all">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 shadow-md dark:shadow-none flex items-center justify-center text-[#9CA3AF] hover:bg-primary hover:text-black transition-all">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 shadow-md dark:shadow-none flex items-center justify-center text-[#9CA3AF] hover:bg-primary hover:text-black transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white dark:bg-white/5 shadow-md dark:shadow-none flex items-center justify-center text-[#9CA3AF] hover:bg-primary hover:text-black transition-all">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6 font-serif">Productos</h4>
                        <ul className="space-y-4 text-sm text-[#9CA3AF]">
                            <li><Link href="/catalog?category=Men" className="hover:text-primary transition-colors">Relojes Masculinos</Link></li>
                            <li><Link href="/catalog?category=Women" className="hover:text-primary transition-colors">Relojes Femeninos</Link></li>
                            <li><Link href="/catalog?category=Unisex" className="hover:text-primary transition-colors">Relojes Unisex</Link></li>
                            <li><Link href="/catalog?category=LimitedEdition" className="hover:text-primary transition-colors">Relojes Limitados</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6 font-serif">Empresa</h4>
                        <ul className="space-y-4 text-sm text-[#9CA3AF]">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-primary transition-colors">Prensa</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6 font-serif">Soporte</h4>
                        <ul className="space-y-4 text-sm text-[#9CA3AF]">
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Garantías</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-black dark:text-white font-bold mb-6 font-serif">Contacto</h4>
                        <ul className="space-y-6 text-sm text-[#9CA3AF]">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-[#9CA3AF]">+52 662 123 4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-[#9CA3AF]">info@watch2do.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span className="text-[#9CA3AF]">Mazatlán, Sinaloa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                    <p>&copy; {new Date().getFullYear()} Watch2Do. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Política de Privacidad</Link>
                        <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">Términos de Servicio</Link>
                        <Link href="/cookies" className="hover:text-black dark:hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
