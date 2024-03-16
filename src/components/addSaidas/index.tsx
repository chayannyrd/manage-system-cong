"use Client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Grupo {
    id: string;
    nome: string;
}

interface AddSaidasProps {
    onClose: () => void;
    onAdicionarSaida: (novaSaida: Saida) => void;
}

interface Saida {
    id: string;
    horario: string;
    diaSemana: string;
    local: string;
    dirigente: string;
    grupo: string;
}

export const AddSaidas: React.FC<AddSaidasProps> = ({
    onClose,
    onAdicionarSaida,
}) => {
    const [horario, setHorario] = useState("");
    const [diaSemana, setDiaSemana] = useState("");
    const [local, setLocal] = useState("");
    const [dirigente, setDirigente] = useState("");
    const [grupo, setGrupo] = useState("");
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ];

    useEffect(() => {
        fetchGrupos();
    }, []);

    const fetchGrupos = async () => {
        try {
            const response = await axios.get<Grupo[]>(
                "http://localhost:3000/grupos"
            );
            setGrupos(response.data);
        } catch (error) {
            console.error("Erro ao buscar grupos:", error);
        }
    };

    const handleAdicionarSaida = async () => {
        try {
            const response = await axios.post<Saida>(
                "http://localhost:3000/saidas",
                {
                    horario,
                    diaSemana,
                    local,
                    dirigente,
                    grupo,
                }
            );

            onAdicionarSaida(response.data);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar saída:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Saída
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Dia da semana:
                        </label>
                        <select
                            value={diaSemana}
                            onChange={(e) => setDiaSemana(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            {diasSemana.map((dia, index) => (
                                <option key={index} value={dia}>
                                    {dia}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Horário:
                        </label>
                        <input
                            type="text"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            placeholder="00:00"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Local:
                        </label>
                        <input
                            type="text"
                            value={local}
                            onChange={(e) => setLocal(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Dirigente:
                        </label>
                        <input
                            type="text"
                            value={dirigente}
                            onChange={(e) => setDirigente(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Grupo:
                        </label>
                        <select
                            value={grupo}
                            onChange={(e) => setGrupo(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            {grupos.map((grupo) => (
                                <option key={grupo.id} value={grupo.nome}>
                                    {grupo.nome}
                                </option>
                            ))}
                        </select>
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
                        onClick={handleAdicionarSaida}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
