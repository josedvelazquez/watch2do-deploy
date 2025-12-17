"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Package, X, Save, Loader2, Image as ImageIcon } from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category_id: number;
    category_name?: string;
}

interface Category {
    id: number;
    name: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        description: "",
        category_id: ""
    });

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            fetch("/api/admin/products").then(res => res.json()),
            fetch("/api/categories").then(res => res.json())
        ]).then(([productsData, categoriesData]) => {
            if (Array.isArray(productsData)) setProducts(productsData);
            if (Array.isArray(categoriesData)) setCategories(categoriesData);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    price: parseFloat(formData.price),
                    image: formData.image,
                    description: formData.description,
                    category_id: parseInt(formData.category_id)
                })
            });

            if (res.ok) {
                setIsCreating(false);
                setFormData({ name: "", price: "", image: "", description: "", category_id: "" });
                fetchData(); // Refresh list
            } else {
                alert("Error al crear producto");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Productos</h2>
                    <p className="text-gray-400">Administra el catálogo de relojes.</p>
                </div>
                <Button
                    onClick={() => setIsCreating(true)}
                    className="bg-[#D4AF37] text-black hover:bg-[#c4a030]"
                >
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Producto
                </Button>
            </div>

            {/* Create Product Form */}
            {isCreating && (
                <Card className="bg-zinc-900 border-white/10 mb-8 border-l-4 border-l-[#D4AF37]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-white text-lg">Agregar Nuevo Producto</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}><X className="w-4 h-4" /></Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Nombre</Label>
                                    <Input
                                        id="name" name="name"
                                        value={formData.name} onChange={handleInputChange}
                                        required className="bg-white/5 border-white/10 text-white"
                                        placeholder="Ej. Chronos Gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-white">Precio ($)</Label>
                                    <Input
                                        id="price" name="price" type="number" step="0.01"
                                        value={formData.price} onChange={handleInputChange}
                                        required className="bg-white/5 border-white/10 text-white"
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category_id" className="text-white">Categoría</Label>
                                    <select
                                        id="category_id" name="category_id"
                                        value={formData.category_id} onChange={handleInputChange}
                                        required
                                        className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="" className="bg-zinc-900">Seleccionar categoría...</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-white">URL de la Imagen</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="image" name="image"
                                            value={formData.image} onChange={handleInputChange}
                                            required className="bg-white/5 border-white/10 text-white flex-1"
                                            placeholder="/images/watch1.png"
                                        />
                                        {formData.image && (
                                            <div className="w-10 h-10 relative bg-white/5 rounded border border-white/10 flex items-center justify-center overflow-hidden">
                                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                                <ImageIcon className="w-4 h-4 text-gray-500 absolute z-[-1]" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-white">Descripción</Label>
                                <Textarea
                                    id="description" name="description"
                                    value={formData.description} onChange={handleInputChange}
                                    className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                    placeholder="Detalles sobre el reloj..."
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <Button type="button" variant="ghost" onClick={() => setIsCreating(false)} className="text-white hover:bg-white/10">Cancelar</Button>
                                <Button type="submit" disabled={isSaving} className="bg-[#D4AF37] text-black hover:bg-[#c4a030]">
                                    {isSaving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando</> : <><Save className="w-4 h-4 mr-2" /> Guardar Producto</>}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Products List */}
            <Card className="bg-zinc-900 border-white/5">
                <CardHeader>
                    <CardTitle className="text-white">Catálogo ({products.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400 text-sm">
                                    <th className="pb-4 pl-4">Imagen</th>
                                    <th className="pb-4">Nombre</th>
                                    <th className="pb-4">Categoría</th>
                                    <th className="pb-4">Precio</th>
                                    <th className="pb-4 text-right pr-4">ID</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-8 text-center text-gray-500">Cargando productos...</td></tr>
                                ) : products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-3 pl-4">
                                            <div className="w-12 h-12 rounded bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <ImageIcon className="w-5 h-5 text-gray-600" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3 text-white font-medium">{product.name}</td>
                                        <td className="py-3 text-gray-400">
                                            <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300">
                                                {product.category_name || "Sin categoría"}
                                            </span>
                                        </td>
                                        <td className="py-3 text-[#D4AF37] font-medium">${product.price.toLocaleString()}</td>
                                        <td className="py-3 text-right pr-4 text-gray-600 text-xs">#{product.id}</td>
                                    </tr>
                                ))}
                                {!loading && products.length === 0 && (
                                    <tr><td colSpan={5} className="py-8 text-center text-gray-500">No hay productos registrados.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
