"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddDesignacaoProps {
    onClose: () => void;
    onAdicionarDesignacao: (designacaoData: any) => void;
}

export const AddDesignacao: React.FC<AddDesignacaoProps> = ({ onClose }) => {
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [presidente, setPresidente] = useState("");
    const [leitor, setLeitor] = useState("");
    const [indicadores, setIndicadores] = useState("");
    const [microfones1, setMicrofones1] = useState("");
    const [microfones2, setMicrofones2] = useState("");
    const [grupoLimpeza, setGrupoLimpeza] = useState("");

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/designacao", {
                dia,
                mes,
                presidente,
                leitor,
                indicadores,
                microfones1,
                microfones2,
                grupoLimpeza,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar designação:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Designação
                </h2>
                <div>
                    <div className="flex items-center mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Semana:
                        </label>
                        <input
                            type="text"
                            value={dia}
                            onChange={(e) => setDia(e.target.value)}
                            placeholder="Dia"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300 mr-1 w-12"
                        />
                        <input
                            type="text"
                            value={mes}
                            onChange={(e) => setMes(e.target.value)}
                            placeholder="Mês"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Presidente da reunião:
                        </label>
                        <input
                            type="text"
                            value={presidente}
                            onChange={(e) => setPresidente(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Leitor da Sentinela:
                        </label>
                        <input
                            type="text"
                            value={leitor}
                            onChange={(e) => setLeitor(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Indicadores:
                        </label>
                        <input
                            type="text"
                            value={indicadores}
                            onChange={(e) => setIndicadores(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Microfones volantes:
                        </label>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                value={microfones1}
                                onChange={(e) => setMicrofones1(e.target.value)}
                                placeholder="Microfone 1"
                                className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300 mr-2"
                            />
                            <input
                                type="text"
                                value={microfones2}
                                onChange={(e) => setMicrofones2(e.target.value)}
                                placeholder="Microfone 2"
                                className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Grupo de limpeza:
                        </label>
                        <input
                            type="text"
                            value={grupoLimpeza}
                            onChange={(e) => setGrupoLimpeza(e.target.value)}
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
