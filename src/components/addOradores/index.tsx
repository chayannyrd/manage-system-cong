"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddOradoresProps {
    onClose: () => void;
}

export const AddOradores: React.FC<AddOradoresProps> = ({ onClose }) => {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [congregacao, setCongregacao] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/oradores", {
                id,
                nome,
                telefone,
                email,
                congregacao,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar orador:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Orador
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            ID:
                        </label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
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
                            onChange={(e) => setNome(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Telefone:
                        </label>
                        <input
                            type="text"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="(00 00000-0000)"
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
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Congregação:
                        </label>
                        <input
                            type="text"
                            value={congregacao}
                            onChange={(e) => setCongregacao(e.target.value)}
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
