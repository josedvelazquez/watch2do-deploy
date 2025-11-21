import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export function SecurityBadges() {
    return (
        <div className="bg-white/5 rounded-xl p-8 mt-8 shadow-sm border border-white/10">
            <h3 className="text-center font-serif font-bold text-white text-xl mb-8">Seguridad Garantizada</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                        <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Encriptación SSL</h4>
                        <p className="text-xs text-gray-400 mt-1">Todos tus datos están protegidos</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Lock className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">PCI Compliant</h4>
                        <p className="text-xs text-gray-400 mt-1">Estándares de seguridad altos</p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                        <EyeOff className="h-6 w-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">Privacidad Total</h4>
                        <p className="text-xs text-gray-400 mt-1">No almacenamos datos sensibles</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
