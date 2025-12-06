"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Shield, User as UserIcon, Save, X, Loader2 } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
    role: 0 | 1;
    created_at: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ name: "", email: "" });
    const [isSaving, setIsSaving] = useState(false);

    const fetchUsers = () => {
        fetch("/api/admin/users")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setUsers(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fallo al obtener usuarios", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const toggleRole = async (userId: number, currentRole: number) => {
        const newRole = currentRole === 1 ? 0 : 1;

        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, role: newRole })
            });

            if (res.ok) {
                fetchUsers();
            }
        } catch (error) {
            console.error("Fallo al actualizar rol", error);
        }
    };

    const startEdit = (user: User) => {
        setEditingId(user.id);
        setEditForm({ name: user.name, email: user.email });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: "", email: "" });
    };

    const saveUser = async (userId: number) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, ...editForm })
            });

            if (res.ok) {
                setEditingId(null);
                fetchUsers();
            }
        } catch (error) {
            console.error("Fallo al actualizar usuario", error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white mb-2">Gestión de Usuarios</h2>
                <p className="text-gray-400">Ver y administrar roles de usuarios.</p>
            </div>

            <Card className="bg-zinc-900 border-white/5">
                <CardHeader>
                    <CardTitle className="text-white">Usuarios ({users.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400 text-sm">
                                    <th className="pb-4 pl-4">Usuario</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Rol</th>
                                    <th className="pb-4">Fecha Registro</th>
                                    <th className="pb-4 text-right pr-4">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-gray-500">Cargando usuarios...</td>
                                    </tr>
                                ) : users.map((user) => {
                                    const isEditing = editingId === user.id;

                                    return (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 pl-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    {isEditing ? (
                                                        <input
                                                            type="text"
                                                            value={editForm.name}
                                                            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                                            className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                                                        />
                                                    ) : (
                                                        <span className="text-white font-medium">{user.name}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 text-gray-400">
                                                {isEditing ? (
                                                    <input
                                                        type="email"
                                                        value={editForm.email}
                                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                        className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                                                    />
                                                ) : (
                                                    user.email
                                                )}
                                            </td>
                                            <td className="py-4">
                                                <Badge variant={user.role === 1 ? "default" : "secondary"} className={user.role === 1 ? "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30" : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"}>
                                                    {user.role === 1 ? (
                                                        <><Shield className="w-3 h-3 mr-1" /> Admin</>
                                                    ) : (
                                                        <><UserIcon className="w-3 h-3 mr-1" /> Usuario</>
                                                    )}
                                                </Badge>
                                            </td>
                                            <td className="py-4 text-gray-500 text-sm">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 text-right pr-4">
                                                <div className="flex justify-end items-center gap-2">
                                                    {isEditing ? (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => saveUser(user.id)}
                                                                disabled={isSaving}
                                                                className="text-green-400 hover:text-green-300 hover:bg-green-500/10 h-8 w-8"
                                                            >
                                                                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={cancelEdit}
                                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => startEdit(user)}
                                                                className="text-gray-400 hover:text-white hover:bg-white/10 h-8 w-8"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => toggleRole(user.id, user.role)}
                                                                className="text-[#D4AF37] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs"
                                                            >
                                                                {user.role === 1 ? "Quitar Admin" : "Hacer Admin"}
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
