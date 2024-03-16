"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddUsuariosProps {
    onClose: () => void;
    onAdicionarUsuario: (usuarioData: any) => void;
}

export const AddUsuarios: React.FC<AddUsuariosProps> = ({ onClose }) => {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    };

    const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNome(e.target.value);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSenha(e.target.value);
    };

    const handleAdminChange = () => {
        setIsAdmin(!isAdmin);
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/usuarios", {
                id: id,
                nome: nome,
                email: email,
                senha: senha,
                isAdmin: isAdmin,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Usuário
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            ID:
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={handleIdChange}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Nome:
                        </label>
                        <input
                            type="text"
                            value={nome}
                            onChange={handleNomeChange}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Senha:
                        </label>
                        <input
                            type="password"
                            value={senha}
                            onChange={handleSenhaChange}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Administrador:
                        </label>
                        <div className="flex items-center">
                            <label className="bg-transparent text-slate-900 px-2 py-1">
                                Sim:
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={handleAdminChange}
                                    className="ml-2"
                                />
                            </label>
                            <label className="bg-transparent text-slate-900 px-2 py-1">
                                Não:
                                <input
                                    type="checkbox"
                                    checked={!isAdmin}
                                    onChange={handleAdminChange}
                                    className="ml-2"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Foto:
                        </label>
                        <input
                            type="file"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
