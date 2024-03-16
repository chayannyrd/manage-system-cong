"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddUsuarios } from "@/components";

interface Usuario {
    id: string;
    nome: string;
    email: string;
    isAdmin: boolean;
    foto?: string; // Adicionando a possibilidade de foto ser opcional
}

interface PopupUsuariosProps {
    onClose: () => void;
}

export const PopupUsuarios: React.FC<PopupUsuariosProps> = ({ onClose }) => {
    const [addUsuariosAberto, setAddUsuariosAberto] = useState(false);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get<Usuario[]>(
                    "http://localhost:3000/usuarios"
                );
                setUsuarios(response.data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsuarios();
    }, []);

    const abrirAddUsuarios = () => {
        setAddUsuariosAberto(true);
    };

    const fecharAddUsuarios = () => {
        setAddUsuariosAberto(false);
    };

    const handleAdicionarUsuario = async (usuarioData: any) => {
        try {
            await axios.post("http://localhost:3000/usuarios", usuarioData);
            fecharAddUsuarios();
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Usuários
                </h2>
                <div className="mb-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800">ID</th>
                                <th className="px-4 py-2 text-gray-800">
                                    Nome
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Admin
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Foto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className="px-4 py-2 text-gray-800">
                                        {usuario.id}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {usuario.nome}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {usuario.email}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {usuario.isAdmin ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {usuario.foto ? usuario.foto : "-"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={abrirAddUsuarios}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addUsuariosAberto && (
                <AddUsuarios
                    onClose={fecharAddUsuarios}
                    onAdicionarUsuario={handleAdicionarUsuario}
                />
            )}
        </div>
    );
};
