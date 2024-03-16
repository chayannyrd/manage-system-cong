"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddDiscursosProps {
    onClose: () => void;
    onAdicionarDiscurso: (novoDiscurso: Discurso) => void;
}

interface Discurso {
    id: string;
    numero: string;
    tema: string;
}

export const AddDiscursos: React.FC<AddDiscursosProps> = ({
    onClose,
    onAdicionarDiscurso,
}) => {
    const [numero, setNumero] = useState("");
    const [temaDiscurso, setTemaDiscurso] = useState("");

    const handleAdicionarDiscurso = async () => {
        try {
            const response = await axios.post<Discurso>(
                "http://localhost:3000/discursos",
                {
                    numero: numero,
                    tema: temaDiscurso,
                }
            );

            onAdicionarDiscurso(response.data);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar discurso:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Discurso
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Número:
                        </label>
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className="border rounded-md px-2 py-1 bg-gray-300 text-gray-800"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Tema do discurso:
                        </label>
                        <input
                            type="text"
                            value={temaDiscurso}
                            onChange={(e) => setTemaDiscurso(e.target.value)}
                            className="border rounded-md px-2 py-1 bg-gray-300 text-gray-800"
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
                        onClick={handleAdicionarDiscurso}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
