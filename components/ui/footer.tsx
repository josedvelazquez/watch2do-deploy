import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, Watch } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black">
                                <Watch className="h-5 w-5" />
                            </div>
                            Watch2Do
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Tu destino para relojes de lujo y accesorios premium. Calidad, elegancia y precisión en cada pieza.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-black transition-all">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Productos</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/catalog?category=Men" className="hover:text-primary transition-colors">Relojes Masculinos</Link></li>
                            <li><Link href="/catalog?category=Women" className="hover:text-primary transition-colors">Relojes Femeninos</Link></li>
                            <li><Link href="/catalog?category=Unisex" className="hover:text-primary transition-colors">Relojes Unisex</Link></li>
                            <li><Link href="/catalog?category=LimitedEdition" className="hover:text-primary transition-colors">Relojes Limitados</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Empresa</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/team" className="hover:text-primary transition-colors">Nuestro Equipo</Link></li>
                            <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link href="/press" className="hover:text-primary transition-colors">Prensa</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Soporte</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/help" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
                            <li><Link href="/warranty" className="hover:text-primary transition-colors">Garantías</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contacto</h4>
                        <ul className="space-y-6 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+52 999 999 9999</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>info@watch2do.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>Mazatlán, Sinaloa</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Watch2Do. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Términos de Servicio</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
