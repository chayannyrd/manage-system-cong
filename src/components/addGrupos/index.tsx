"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddGruposProps {
    onClose: () => void;
    onAdicionarGrupo: (novoGrupo: Grupo) => void;
}

interface Grupo {
    id: string;
    nome: string;
}

export const AddGrupos: React.FC<AddGruposProps> = ({
    onClose,
    onAdicionarGrupo,
}) => {
    const [idGrupo, setIdGrupo] = useState("");
    const [nomeGrupo, setNomeGrupo] = useState("");

    const handleAdicionarGrupo = async () => {
        try {
            const response = await axios.post<Grupo>(
                "http://localhost:3000/grupos",
                {
                    id: idGrupo,
                    nome: nomeGrupo,
                }
            );

            onAdicionarGrupo(response.data);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar grupo:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Grupo
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            ID:
                        </label>
                        <input
                            type="text"
                            value={idGrupo}
                            onChange={(e) => setIdGrupo(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Nome do Grupo:
                        </label>
                        <input
                            type="text"
                            value={nomeGrupo}
                            onChange={(e) => setNomeGrupo(e.target.value)}
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
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAdicionarGrupo}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
