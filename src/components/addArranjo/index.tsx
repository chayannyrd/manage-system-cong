"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddArranjoProps {
    onClose: () => void;
}

export const AddArranjo: React.FC<AddArranjoProps> = ({ onClose }) => {
    const [data, setData] = useState("");
    const [tema, setTema] = useState("");
    const [orador, setOrador] = useState("");
    const [presencial, setPresencial] = useState(false);
    const [transmissao, setTransmissao] = useState(false);
    const [arranjoConfirmado, setArranjoConfirmado] = useState("");

    const handlePresencialChange = () => {
        setPresencial(true);
        setTransmissao(false);
    };

    const handleTransmissaoChange = () => {
        setPresencial(false);
        setTransmissao(true);
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/arranjo", {
                data,
                tema,
                orador,
                presencial,
                transmissao,
                arranjoConfirmado,
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar arranjo de discurso:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar arranjo de discurso
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Data (dd/mm/aaaa):
                        </label>
                        <input
                            type="text"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Tema:
                        </label>
                        <input
                            type="text"
                            value={tema}
                            onChange={(e) => setTema(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Orador:
                        </label>
                        <input
                            type="text"
                            value={orador}
                            onChange={(e) => setOrador(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Presencial:
                    </label>
                    <input
                        type="checkbox"
                        checked={presencial}
                        onChange={handlePresencialChange}
                        className="mr-2"
                    />
                    <label className="bg-transparent text-slate-900">
                        Transmissão:
                    </label>
                    <input
                        type="checkbox"
                        checked={transmissao}
                        onChange={handleTransmissaoChange}
                    />
                    <br />
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Arranjo confirmado:
                    </label>
                    <select
                        value={arranjoConfirmado}
                        onChange={(e) => setArranjoConfirmado(e.target.value)}
                        className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                    >
                        <option value="">Selecione</option>
                        <option value="sim">Sim</option>
                        <option value="nao">Não</option>
                    </select>
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
