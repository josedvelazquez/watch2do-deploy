import { Button } from "./button"

export function Newsletter() {
    return (
        <section className="py-24 bg-zinc-900 border-t border-white/10">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Unirse al Club</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                    Suscríbete a nuestro boletín para recibir ofertas exclusivas, acceso temprano a nuevas colecciones y consejos de estilo directamente a tu bandeja de entrada.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Introduce tu correo electrónico"
                        className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                    />
                    <Button size="lg" className="w-full sm:w-auto">
                        Suscribirse
                    </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                    Al suscribirse, usted acepta nuestros Términos de Servicio y Política de Privacidad.
                </p>
            </div>
        </section>
    )
}
