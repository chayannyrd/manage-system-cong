"use client";
import React, { useState } from "react";
import axios from "axios";

interface Participante {
    id: string;
    nome: string;
    ajudante: string;
    dia: string;
    semana: string;
    numeroParte: string;
    salaPrincipal: boolean;
    salaB: boolean;
}

interface AddPartVMProps {
    onClose: () => void;
    onAdicionarParticipante: (novoParticipante: Participante) => void;
}

export const AddPartVM: React.FC<AddPartVMProps> = ({
    onClose,
    onAdicionarParticipante,
}) => {
    const [nomeParticipante, setNomeParticipante] = useState("");
    const [nomeAjudante, setNomeAjudante] = useState("");
    const [semanaDia, setSemanaDia] = useState("");
    const [semana, setSemana] = useState("");
    const [numeroParte, setNumeroParte] = useState("");
    const [salaPrincipalChecked, setSalaPrincipalChecked] = useState(false);
    const [salaBChecked, setSalaBChecked] = useState(false);

    const handleSalaPrincipalChange = () => {
        setSalaPrincipalChecked(!salaPrincipalChecked);
        setSalaBChecked(false);
    };

    const handleSalaBChange = () => {
        setSalaBChecked(!salaBChecked);
        setSalaPrincipalChecked(false);
    };

    const handleAdicionarParticipante = async () => {
        const novoParticipante: Participante = {
            id: "",
            nome: nomeAjudante,
            ajudante: nomeParticipante,
            dia: semanaDia,
            semana: semana,
            numeroParte: numeroParte,
            salaPrincipal: salaPrincipalChecked,
            salaB: salaBChecked,
        };

        try {
            const response = await axios.post<Participante>(
                "http://localhost:3000/partVM",
                novoParticipante
            );
            // Chamar a função de callback para adicionar o participante
            onAdicionarParticipante(response.data);
        } catch (error) {
            console.error("Erro ao adicionar participante:", error);
        }

        // Fechar o modal após adicionar o participante
        onClose();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar parte
                </h2>
                <div className="flex items-center mb-2">
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Semana:
                    </label>
                    <input
                        type="text"
                        value={semanaDia}
                        onChange={(e) => setSemanaDia(e.target.value)}
                        placeholder="Dia"
                        className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300 mr-1 w-12"
                    />
                    <input
                        type="text"
                        value={semana}
                        onChange={(e) => setSemana(e.target.value)}
                        placeholder="Mês"
                        className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Publicador:
                        </label>
                        <input
                            type="text"
                            value={nomeAjudante}
                            onChange={(e) => setNomeAjudante(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                </div>
                <div className="flex flex-col mb-2">
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Ajudante:
                    </label>
                    <input
                        type="text"
                        value={nomeParticipante}
                        onChange={(e) => setNomeParticipante(e.target.value)}
                        className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Número da parte:
                    </label>
                    <input
                        type="text"
                        value={numeroParte}
                        onChange={(e) => setNumeroParte(e.target.value)}
                        className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                    />
                </div>
                <div className="mb-2">
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Principal:
                        <input
                            type="checkbox"
                            checked={salaPrincipalChecked}
                            onChange={handleSalaPrincipalChange}
                            className="ml-2"
                        />
                    </label>
                    <label className="bg-transparent text-slate-900 px-2 py-1">
                        Sala B:
                        <input
                            type="checkbox"
                            checked={salaBChecked}
                            onChange={handleSalaBChange}
                            className="ml-2"
                        />
                    </label>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAdicionarParticipante}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
