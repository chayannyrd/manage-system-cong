"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddCongProps {
    onClose: () => void;
}

const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
];

export const AddCong: React.FC<AddCongProps> = ({ onClose }) => {
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");

    const handleAdicionarCongregacao = async () => {
        try {
            await axios.post("http://localhost:3000/cong", {
                id: id,
                nome: nome,
                cidade: cidade,
                uf: uf,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar congregação:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Congregação
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
                            Nome da congregação:
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
                            Cidade:
                        </label>
                        <input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex justify-center mb-2">
                        <div className="flex items-center">
                            <label className="bg-transparent text-slate-900 px-2 py-1">
                                UF:
                            </label>
                            <select
                                value={uf}
                                onChange={(e) => setUf(e.target.value)}
                                className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                            >
                                <option value="">Selecione</option>
                                {ufs.map((uf, index) => (
                                    <option key={index} value={uf}>
                                        {uf}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                        onClick={handleAdicionarCongregacao}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
