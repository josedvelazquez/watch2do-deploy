import Image from "next/image";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/relo-hombre.jpg"
                            alt="Watchmaking Workshop"
                            fill
                            className="object-cover brightness-[0.3]"
                        />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif">Nuestra Historia</h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Redefiniendo la excelencia en relojería desde 2025.
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-white">La Misión de Watch2Do</h2>
                            <p className="text-gray-400 leading-relaxed">
                                En Watch2Do, creemos que un reloj es más que un instrumento para medir el tiempo; es una declaración de estilo, una obra de ingeniería y un legado. Nuestra misión es acercar la alta relojería a aquellos que aprecian la precisión y el diseño atemporal.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Nos dedicamos a curar una colección exclusiva que combina la tradición artesanal con la innovación moderna, asegurando que cada pieza cuente una historia única.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-lg overflow-hidden border border-white/10">
                            <Image
                                src="/images/watch1.png"
                                alt="Watch Detail"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-white/5 border-y border-white/10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-white text-center mb-16">Nuestros Valores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto text-[#D4AF37] text-2xl">
                                    💎
                                </div>
                                <h3 className="text-xl font-bold text-white">Excelencia</h3>
                                <p className="text-gray-400">
                                    Buscamos la perfección en cada detalle, desde la selección de materiales hasta el servicio al cliente.
                                </p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto text-[#D4AF37] text-2xl">
                                    🤝
                                </div>
                                <h3 className="text-xl font-bold text-white">Integridad</h3>
                                <p className="text-gray-400">
                                    Operamos con total transparencia y honestidad, construyendo relaciones duraderas con nuestros clientes.
                                </p>
                            </div>
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto text-[#D4AF37] text-2xl">
                                    🌍
                                </div>
                                <h3 className="text-xl font-bold text-white">Sostenibilidad</h3>
                                <p className="text-gray-400">
                                    Comprometidos con prácticas responsables que respeten nuestro entorno y comunidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
